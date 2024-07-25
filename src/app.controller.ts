import {
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Query
} from '@nestjs/common'
import { Wechat } from 'wechat-jssdk'

import { WXSignatureQueryDto } from '@/app.dto'

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name, { timestamp: true })

  @Get('signature')
  async getWXSignature(
    @Query() { url, appId, appSecret }: WXSignatureQueryDto
  ) {
    try {
      const wx = new Wechat({ appId, appSecret })
      return await wx.jssdk.getSignature(url)
    } catch (error) {
      this.logger.error(error)
      throw new ForbiddenException()
    }
  }
}
