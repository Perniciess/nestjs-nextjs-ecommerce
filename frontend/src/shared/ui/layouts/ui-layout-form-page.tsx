import type { ReactNode } from 'react'
import { UiLogo } from '@/shared/ui/icons/ui-logo-icon'
import { ROUTES } from '../../routing/routes'
import { UiLink } from '../ui-link'

export function UiFormPageLayout({ title, form }: { form?: ReactNode, title: string }) {
    return (
        <div className="flex min-h-screen flex-row">
            <div className="w-1/2 bg-zinc-950">
                <div className="flex grow flex-row items-start justify-start pl-3 pt-1">
                    <UiLink variant="white" href={ROUTES.HOME} className="flex flex-row items-center justify-center">
                        <UiLogo className="size-12" color="white" />
                        <p className="ml-1 text-xl">ITEMCLUB</p>
                    </UiLink>
                </div>
                <div className="absolute bottom-1 left-0 max-w-[50%] pb-4 pl-6">
                    <p className="leading-5 text-white">
                        Это библиотека, которая сэкономит ваше время в поиске одежды. Чем меньше времени Вы тратите на
                        поиск уникальной одежды, тем больше эмоций Вы сможете заполучить.
                    </p>
                </div>
            </div>
            <div className="flex w-1/2 items-center justify-center">
                <div className="w-full max-w-[400px] bg-white px-14 py-8 pb-14">
                    <h1 className="mb-6 text-center text-2xl font-bold">{title}</h1>
                    {form}
                </div>
            </div>
        </div>
    )
}
