import { useSignOut } from '@/features/auth/api/use-sign-out'
import { UiButton } from '@/shared/ui/ui-button'

export function SignOutButton() {
    const { isLoading, signOut } = useSignOut()
    return (
        <UiButton variant="black" disabled={isLoading} onClick={() => signOut()}>
            Выйти
        </UiButton>
    )
}
