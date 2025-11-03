import { useResetSession } from '@/entities/user/api/useSession'
import { authService } from '@/shared/api/auth/authApi'
import { ROUTES } from '@/shared/routing/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export function useSignOut() {
    const resetSession = useResetSession()
    const router = useRouter()

    const singOutMutation = useMutation({
        mutationKey: ['sign-out'],
        mutationFn: async () => authService.logout(),
        async onSuccess() {
            void router.push(ROUTES.HOME)
            resetSession()
        },
    })

    return {
        isLoading: singOutMutation.isPending,
        signOut: singOutMutation.mutate,
    }
}
