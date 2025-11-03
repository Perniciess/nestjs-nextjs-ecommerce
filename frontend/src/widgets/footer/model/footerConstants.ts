import { ROUTES } from '@/shared/routing/routes'

export const footerDescriptions = [
    {
        id: 0,
        name: 'Покупателям',
        description: ['Интернет-магазин', 'Как сделать заказ', 'Оплата, доставка и возврат'],
        link: [ROUTES.ACCESSORIES, ROUTES.CATALOG, ROUTES.DRESS],
    },
    {
        id: 1,
        name: 'О компании',
        description: ['Политика конфиденциальности', 'Публичная оферта', 'Контакты'],
        link: [ROUTES.ACCESSORIES, ROUTES.CATALOG, ROUTES.DRESS],
    },
    {
        id: 2,
        name: 'Связаться',
        description: ['+7 (912) 345 67 89', 'info@itemclub.ru', 'Задать вопрос'],
        link: [ROUTES.ACCESSORIES, ROUTES.CATALOG, ROUTES.DRESS],
    },
]
