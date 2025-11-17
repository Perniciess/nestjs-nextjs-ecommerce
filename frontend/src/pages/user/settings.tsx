import { SignOutButton } from '@/features/auth/ui/sign-out-button'
import { UiLayoutUserPage } from '@/shared/ui/layouts/ui-layout-user-page'
import { usePathname } from 'next/navigation'

export default function UserSettingsPage() {
    const pathname = usePathname(); 

    return (
        <>
            <UiLayoutUserPage pathname={pathname}
                title="Настройки"
                description="Дополнительные настройки Вашего профиля"
            >
                <div>
                    <SignOutButton />
                </div>
            </UiLayoutUserPage>

        </>
    )
}
