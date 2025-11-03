/* eslint-disable ts/consistent-type-imports */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { BrandDto } from './dto/brand.dto'
import { CarouselDto } from './dto/carousel.dto'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async createBrand(body: BrandDto) {
        return this.prisma.brand.create({
            data: { brand_name: body.brand_name },
        })
    }

    async getBrands() {
        return this.prisma.brand.findMany()
    }

    async getBrand(id: string) {
        return this.prisma.brand.findUnique({ where: { brand_id: id } })
    }

    async createCategory(body: CategoryDto) {
        return this.prisma.category.create({
            data: {
                ...body,
            },
        })
    }

    async getCategories() {
        return this.prisma.category.findMany({ include: { children: true } })
    }

    async getCategory(id: string) {
        return this.prisma.category.findUnique({
            where: { id },
            include: { children: true },
        })
    }

    async getCarousel() {
        return this.prisma.carousel.findMany({
            select: {
                id: true,
                product: {
                    select: {
                        product_id: true,
                        name: true,
                        price: true,
                        brand: {
                            select: {
                                brand_name: true,
                            },
                        },
                        categories: {
                            select: {
                                name: true,
                                parent: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                        image: true,
                    },
                },
            },
        })
    }

    async addToCarousel(body: CarouselDto) {
        return this.prisma.carousel.update({
            where: { id: '7cdbedb1-1fbf-422a-b4c1-5d17625dbff2' },
            data: {
                product: {
                    connect: { product_id: body.product_id },
                },
            },
        })
    }

    async removeFromCarousel(body: CarouselDto) {
        return this.prisma.carousel.update({
            where: { id: '7cdbedb1-1fbf-422a-b4c1-5d17625dbff2' },
            data: {
                product: {
                    disconnect: { product_id: body.product_id },
                },
            },
        })
    }
}
