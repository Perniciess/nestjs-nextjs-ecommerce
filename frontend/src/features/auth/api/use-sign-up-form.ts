import type { ISignUpForm } from '@/shared/api/auth/authTypes'
import { authService } from '@/shared/api/auth/authApi'
import { ROUTES } from '@/shared/routing/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export function useSignUpForm() {
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<ISignUpForm>({
        mode: 'onChange',
    })

    const signUpMutation = useMutation({
        mutationKey: ['sign-up'],
        mutationFn: async (data: ISignUpForm) => authService.signUp(data),
        onSuccess() {
            reset()
            void router.push(ROUTES.HOME)
        },
    })

    const errorMessage = signUpMutation.error ? 'Ошибка регистрации' : undefined

    return {
        register,
        errorMessage,
        handleSubmit: handleSubmit(data => signUpMutation.mutate(data)),
        isPending: signUpMutation.isPending,
    }
}
