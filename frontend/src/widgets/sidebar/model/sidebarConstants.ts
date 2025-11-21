import { ROUTES } from '@/shared/routing/routes'
import { AccountsIcon } from '../ui/icons/accounts-icon'
import { AddProductIcon } from '../ui/icons/add-product-icon'
import { BuyListIcon } from '../ui/icons/buy-list-icon'
import { CarouselIcon } from '../ui/icons/carousel-icon'
import { PopularProductsIcon } from '../ui/icons/popular-products-icon'
import { ProductsIcon } from '../ui/icons/products-icon'
import { SettingsIcon } from '../ui/icons/settings-icon'
import { UserIcon } from '../ui/icons/user-icon'
import { UiBasketIcon } from '../ui/icons/basket-icon'

export const sidebarItemsAdmin = [
    {
        id: 0,
        label: 'Аккаунты',
        icon: AccountsIcon,
        href: ROUTES.ADMIN_ACCOUNTS,
    },
    {
        id: 1,
        label: 'Список товаров',
        icon: ProductsIcon,
        href: ROUTES.ADMIN_LIST_PRODUCTS,
    },
    {
        id: 2,
        label: 'Добавить товар',
        icon: AddProductIcon,
        href: ROUTES.ADMIN_ADD_PRODUCT,
    },

    {
        id: 3,
        label: 'Настройки карусели',
        icon: CarouselIcon,
        href: ROUTES.ADMIN_CAROUSEL_SETTINGS,
    },

    {
        id: 3,
        label: 'Настройка популярных товаров',
        icon: PopularProductsIcon,
        href: ROUTES.ADMIN_POPULAR_PRODUCTS_SETTINGS,
    },
]

export const sidebarItems = [
    {
        id: 0,
        label: 'Профиль',
        icon: UserIcon,
        href: ROUTES.ACCOUNT,
    },
    {
        id: 1,
        label: 'Моя корзина',
        icon: UiBasketIcon,
        href: ROUTES.BASKET
    },
    {
        id: 2,
        label: 'История покупок',
        icon: BuyListIcon,
        href: ROUTES.HISTORY,
    },
    {
        id: 3,
        label: 'Настройки',
        icon: SettingsIcon,
        href: ROUTES.SETTINGS,
    },
]
