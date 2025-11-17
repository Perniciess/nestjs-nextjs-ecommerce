import { categoriesService } from '@/shared/api/categories/categoriesApi'
import { CarouselResponse } from '@/shared/api/categories/categoriesTypes'
import { useQuery } from '@tanstack/react-query'

export function useGetCarousel() {
  const { data, isPending } = useQuery<CarouselResponse>({
    queryKey: ['get-carousel'],
    queryFn: () => categoriesService.getCarousel(),
    select: data =>
      data.map(carouselItem => ({
        ...carouselItem,
        product: carouselItem.product.map(product => ({
          ...product,
          // Используем относительный путь к изображению
          image: product.image.startsWith('/')
            ? product.image
            : `/${product.image.replace(/^\/+/, '')}`,
        })),
      })),
  })

  return { data, isPending }
}
