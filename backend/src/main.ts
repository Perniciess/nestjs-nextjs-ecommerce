import { join } from 'node:path'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { AppModule } from './app.module'
import { CustomExceptionFilter } from './common/filters/not-found.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });


    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new CustomExceptionFilter())

    app.enableCors({
        origin: process.env.CLIENT_URL || '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    })

    // Правильный путь к папке uploads
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

    await app.listen(3001, '0.0.0.0')
}
bootstrap()
