import type { IProductResponse, ProductListResponse } from './productTypes'
import { axiosClassic } from '@/shared/api/interceptors'

export class ProductService {
    BASE_URL = '/products/'
    GET_PRODUCT_LIST_URL = '/products/all'

    async getProduct() {
        const response = await axiosClassic.get<IProductResponse>(this.BASE_URL)
        return response.data
    }

    async getProductList() {
        const response = await axiosClassic.get<ProductListResponse>(this.GET_PRODUCT_LIST_URL)
        return response.data
    }
}

export const productService = new ProductService()
