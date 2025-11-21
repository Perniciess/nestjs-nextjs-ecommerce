import { SignInForm } from '@/features/auth'
import { UiFormPageLayout } from '@/shared/ui/layouts/ui-layout-form-page'

export default function SignInPage() {
    return (
        <UiFormPageLayout
            title="Авторизация"
            form={<SignInForm />}
        />
    )
}
