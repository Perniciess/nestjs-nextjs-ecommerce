import { join } from 'node:path'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { AppModule } from './app.module'
import { CustomExceptionFilter } from './common/filters/not-found.filter'


async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new CustomExceptionFilter())
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    })
    app.use('/uploads', express.static(join(process.cwd(), '../', 'uploads')))
    await app.listen(3000)
}
bootstrap()
