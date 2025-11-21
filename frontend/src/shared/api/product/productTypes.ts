export interface IProductResponse {
	product_id: string
	name: string
	price: string
	description: string
	size: string
	color: string
	image: string
	carousel_id: string
	brand: {
		brand_id: string
		brand_name: string
	}
	category: {
		category_id: string
		category_name: string
	}
}

export type ProductListResponse = IProductResponse[]
