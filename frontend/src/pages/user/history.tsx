import { UiLayoutUserPage } from '@/shared/ui/layouts/ui-layout-user-page'
import { UiTable } from '@/shared/ui/ui-table'
import { usePathname } from 'next/navigation'

export default function UserHistoryPage() {
    const pathname = usePathname(); 

    return (
        <UiLayoutUserPage pathname={pathname}
            title="История заказов"
            description="Отслеживайте все Ваши покупки."
        >
            <UiTable />
        </UiLayoutUserPage>
    )
}
