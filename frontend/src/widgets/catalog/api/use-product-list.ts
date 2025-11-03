import type { IProductResponse, ProductListResponse } from '@/shared/api/product/productTypes'
import { productService } from '@/shared/api/product/productApi'
import { useQuery } from '@tanstack/react-query'

export function useGetProductList() {
    const { data } = useQuery<ProductListResponse>({
        queryKey: ['get-product-list'],
        queryFn: async () => productService.getProductList(),
        select: (data: IProductResponse[]) => {
            const web_url = process.env.NEST_WEB_URL
            return data.map((product: IProductResponse) => ({
                ...product,
                image: `${web_url}${product.image.replace('//', '/')}`,
            }))
        },
    })
    return { data }
}
