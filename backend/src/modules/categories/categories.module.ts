import * as path from 'node:path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'

@Module({
    imports: [ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, '..', 'uploads') })],
    providers: [CategoriesService],
    exports: [CategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule {}
