import * as path from 'node:path'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: path.resolve(__dirname, '..', '..', 'uploads'),
                filename: (req, file, cb) => {
                    const filename = `${Date.now()}-${file.originalname}`
                    cb(null, filename)
                },
            }),
        }),
    ],
})
export class ProductsModule { }
