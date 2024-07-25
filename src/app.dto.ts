import { IsNotEmpty } from 'class-validator'

export class WXSignatureQueryDto {
  @IsNotEmpty()
  url: string

  @IsNotEmpty()
  appId: string

  @IsNotEmpty()
  appSecret: string
}
