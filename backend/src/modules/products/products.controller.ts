/* eslint-disable ts/consistent-type-imports */
import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ProductDto } from './dto/product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('all')
    async getProducts() {
        return this.productsService.getProducts()
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(id)
    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id') id: string) {
        return this.productsService.deleteProduct(id)
    }

    @Post('add')
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(@UploadedFile() file: Express.Multer.File, @Body() body: ProductDto) {
        return this.productsService.addProduct(body, file)
    }
}
