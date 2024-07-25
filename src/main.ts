import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'

import { AppModule } from '@/app.module'

const logger = new Logger('Bootstrap', { timestamp: true })

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {})

  app.use(helmet())

  app.enableCors()
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT)

  logger.log(`Application starts on port: ${process.env.PORT}`)
}

bootstrap()
