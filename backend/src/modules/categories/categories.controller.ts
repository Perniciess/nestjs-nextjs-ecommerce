/* eslint-disable ts/consistent-type-imports */
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { BrandDto } from './dto/brand.dto'
import { CarouselDto } from './dto/carousel.dto'
import { CategoryDto } from './dto/category.dto'

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Post('add_brand')
    async createBrand(@Body() body: BrandDto) {
        return this.categoriesService.createBrand(body)
    }

    @Get('get_brands')
    async getBrands() {
        return this.categoriesService.getBrands()
    }

    @Get('get_brand/:id')
    async getBrand(@Param('id') id: string) {
        return this.categoriesService.getBrand(id)
    }

    @Post('add_category')
    async createCategory(@Body() body: CategoryDto) {
        return this.categoriesService.createCategory(body)
    }

    @Get('get_categories')
    async getCategories() {
        return this.categoriesService.getCategories()
    }

    @Get('get_category/:id')
    async getCategory(@Param('id') id: string) {
        return this.categoriesService.getCategory(id)
    }

    @Get('get_carousel')
    async getCarousel() {
        return this.categoriesService.getCarousel()
    }

    @Post('add_to_carousel')
    async addToCarousel(@Body() body: CarouselDto) {
        return this.categoriesService.addToCarousel(body)
    }

    @Post('delete_from_carousel')
    async deleteFromCarousel(@Body() body: CarouselDto) {
        return this.categoriesService.removeFromCarousel(body)
    }
}
