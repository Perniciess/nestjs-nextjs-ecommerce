import * as path from 'node:path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './modules/auth/auth.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { ProductsModule } from './modules/products/products.module'
import { UsersService } from './modules/users/users.service'


@Module({
    imports: [
        PrismaModule,
        AuthModule,
        ProductsModule,
        CategoriesModule,
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '..', 'uploads'),
            serveStaticOptions: {
                index: false,
            },
        }),
        ConfigModule.forRoot(),
    ],
    providers: [UsersService],
})
export class AppModule { }
