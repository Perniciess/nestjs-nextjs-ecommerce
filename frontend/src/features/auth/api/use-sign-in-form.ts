import type { ISignInForm } from '@/shared/api/auth/authTypes'
import { authService } from '@/shared/api/auth/authApi'
import { ROUTES } from '@/shared/routing/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export function useSignInForm() {
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<ISignInForm>({
        mode: 'onChange',
    })

    const signInMutation = useMutation({
        mutationKey: ['sign-in'],
        mutationFn: async (data: ISignInForm) => authService.signIn(data),
        onSuccess() {
            void router.push(ROUTES.HOME)
            reset()
            
        },
    })

    const errorMessage = signInMutation.error ? 'Ошибка авторизации' : undefined

    return {
        register,
        errorMessage,
        handleSubmit: handleSubmit(data => signInMutation.mutate(data)),
        isPending: signInMutation.isPending,
    }
}
