import { useSignInForm } from '@/features/auth/api/use-sign-in-form'
import { ROUTES } from '@/shared/routing/routes'
import { UiButton } from '@/shared/ui/ui-button'
import { UiLink } from '@/shared/ui/ui-link'
import { UiTextField } from '@/shared/ui/ui-text-field'

export function SignInForm() {
    const { handleSubmit, isPending, register, errorMessage } = useSignInForm()
    return (
        <form className="flex flex-col gap-4 text-center" onSubmit={e => void handleSubmit(e)}>
            <UiTextField
                label="Электронная почта"
                inputProps={{
                    type: 'email',
                    ...register('email', { required: true }),
                    className: 'rounded-md',
                    autoComplete: 'none',
                }}

            />
            <UiTextField
                label="Пароль"
                inputProps={{
                    type: 'password',
                    ...register('password', { required: true }),
                    className: 'rounded-md',
                    autoComplete: 'new-password', // lol fix autocomplete
                }}
            >
            </UiTextField>

            <UiButton disabled={isPending} variant="black" className="self-center">
                Войти
            </UiButton>

            <p className="mt-3">
                Нет аккаунта?
                <UiLink variant="gray" href={ROUTES.SIGNUP}>
                    Регистрация
                </UiLink>
            </p>
            <UiLink variant="gray" href={ROUTES.RESET_PASSWORD}>
                Забыли пароль?
            </UiLink>
            {(errorMessage != null) && <div className="text-rose-600">{errorMessage}</div>}
        </form>
    )
}
