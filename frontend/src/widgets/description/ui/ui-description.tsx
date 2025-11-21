import { BackIcon } from '@/shared/ui/icons/ui-back-icon'
import { NextIcon } from '@/shared/ui/icons/ui-next-icon'
import { UiButton } from '@/shared/ui/ui-button'
import { UiLink } from '@/shared/ui/ui-link'
import Image from 'next/image'
import { useState } from 'react'
import { useGetCarousel } from '../api/use-description'

export function UiDescription() {
    const [activeImage, setActiveImage] = useState(0)
    const { data: carousel, isPending } = useGetCarousel()

    if (isPending) {
        return <div>Loading...</div>
    }

    if (carousel === null || carousel === undefined || carousel.length === 0) {
        return <div>No carousel data found.</div>
    }

    const clickNext = () => {
        const productCount = carousel[0]?.product?.length ?? 0
        if (productCount > 0) {
            setActiveImage((activeImage + 1) % productCount)
        }
    }

    const clickPrev = () => {
        const productCount = carousel[0]?.product?.length ?? 0
        if (productCount > 0) {
            setActiveImage((activeImage - 1 + productCount) % productCount)
        }
    }

    const product = carousel[0].product[activeImage]

    return (
        <>
            <div className="xs:grid-cols-1 xxs:grid-cols-1 mx-auto mb-8 mt-20 grid w-full max-w-5xl grid-cols-2 place-items-center rounded-3xl shadow-2xl inset-ring-1 inset-ring-zinc-200">
                <div className="relative flex h-[30vh] w-full items-center justify-center overflow-hidden rounded-2xl">
                    <div className="absolute left-0 top-0 block size-full">
                        <Image
                            src={product.image}
                            alt=""
                            layout="fill"
                            objectFit="contain"
                            className="rounded-l-3xl"
                        />
                    </div>
                </div>

                <div className="grid w-full place-items-start bg-zinc-950 p-4 md:rounded-r-3xl">
                    <div className="relative block h-[60vh] w-full px-10 text-left">
                        <div className="flex flex-col py-8 text-white">
                            <div className="text-4xl font-extrabold">
                                {product.brand.brand_name}
                                {' '}
                                {product.name}
                            </div>
                            <div className="absolute top-40">
                                <div className="text-lg font-medium italic tracking-wide">
                                    {product.price}
                                    {' '}
                                    ₽
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-x-4 bottom-2 flex items-center justify-between">
                            <UiLink variant="none" href={`/products/id?id=${product.product_id}`}>
                                <UiButton variant="white" className="uppercase">
                                    Заказать
                                </UiButton>
                            </UiLink>
                            <div className="flex items-center">
                                <div className="cursor-pointer" onClick={clickNext}>
                                    <NextIcon color="white" className="size-12" />
                                </div>
                                <div className="mr-2 cursor-pointer" onClick={clickPrev}>
                                    <BackIcon color="white" className="size-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
