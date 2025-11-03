import { ROUTES } from '@/shared/routing/routes'
import { UiButton } from '@/shared/ui/ui-button'
import { UiLink } from '@/shared/ui/ui-link'

export function NotFoundPage() {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="mb-5 text-6xl font-bold text-black">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Страница не найдена
                </h1>
                <p className="mt-6 text-base leading-7 text-slate-500">
                    Извините, такой страницы не существует
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <UiButton variant="black">
                        <UiLink variant="none" href={ROUTES.HOME}>
                            На главную
                        </UiLink>
                    </UiButton>
                </div>
            </div>
        </main>
    )
}
