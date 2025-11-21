import { useSessionQuery } from '@/entities/user/api/useSession'
import { ROUTES } from '@/shared/routing/routes'
import { UiIconUser } from '@/shared/ui/icons/ui-icon-user'
import { UiButton } from '@/shared/ui/ui-button'
import { UiLink } from '@/shared/ui/ui-link'
import { UiBasketModal } from '@/widgets/basket-modal/ui/basket-modal'
import { UiSearchModal } from '@/widgets/search-modal/ui/search-modal'

export const UiProfile = () => {
    const { data: session } = useSessionQuery()

    const isAuth = (
        <div className="flex items-center justify-end py-2">
            <UiSearchModal />
            <UiBasketModal />
            <UiLink variant="none" href={ROUTES.ACCOUNT}>
                <UiIconUser />
            </UiLink>
        </div>
    )

    const isNotAuth = (
        <div className="flex items-center justify-end">
            <div className="mr-2 mt-2">
                <UiSearchModal />
            </div>

            <UiLink variant="none" href={ROUTES.SIGNIN}>
                <UiButton variant="black">Войти</UiButton>
            </UiLink>
        </div>
    )

    return session ? isAuth : isNotAuth
}
