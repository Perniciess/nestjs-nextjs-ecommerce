/* eslint-disable ts/consistent-type-imports */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { ProductDto } from './dto/product.dto'

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async getProducts() {
        return this.prisma.product.findMany({
            select: {
                product_id: true,
                name: true,
                price: true,
                size: true,
                color: true,
                image: true,
                brand: {
                    select: {
                        brand_name: true,
                    },
                },
                categories: {
                    select: {
                        parent: {
                            select: {
                                name: true,
                            },
                        },
                        name: true,
                    },
                },
            },
        })
    }

    async getProduct(id: string) {
        return this.prisma.product.findUnique({
            where: { product_id: id },
            select: {
                product_id: true,
                name: true,
                price: true,
                size: true,
                color: true,
                image: true,
                carousel: true,
                brand: {
                    select: {
                        brand_id: true,
                        brand_name: true,
                    },
                },
                categories: {
                    select: {
                        parent: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        id: true,
                        name: true,
                    },
                },
            },
        })
    }

    async deleteProduct(id: string) {
        return this.prisma.product.delete({ where: { product_id: id } })
    }

    async updateProduct(id: string, dto: ProductDto) {
        return this.prisma.product.update({
            where: { product_id: id },
            data: { ...dto },
        })
    }

    async addProduct(dto: ProductDto, file: Express.Multer.File) {
        return this.prisma.product.create({
            data: {
                ...dto,
                image: file.path,
                categories: { connect: { id: dto.category_id } },
            },
        })
    }
}
