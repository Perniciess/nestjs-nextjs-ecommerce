import { axiosClassic } from '../interceptors'
import { CarouselResponse } from './categoriesTypes'

export class CategoriesService {
	BASE_URL = '/categories/'
	GET_CAROUSEL_URL = '/categories/get_carousel'

	async getCarousel() {
		const response = await axiosClassic.get<CarouselResponse>(this.GET_CAROUSEL_URL)
		return response.data
	}
}

export const categoriesService = new CategoriesService()
