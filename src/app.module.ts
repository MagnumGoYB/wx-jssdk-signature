import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

import { AppController } from '@/app.controller'
import configs, { validationSchema } from '@/config'
import { LoggerInterceptor } from '@/logger.interceptor'
import ValidatePipe from '@/validate.pipe'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      envFilePath: ['.env.local', '.env.*.local'],
      load: configs,
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_PIPE, useClass: ValidatePipe },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }
  ]
})
export class AppModule {}
