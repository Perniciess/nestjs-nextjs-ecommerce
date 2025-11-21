import type { IProductResponse } from '../product/productTypes'

export type CarouselResponse = {
    id: string
    product: IProductResponse[]
}[]
