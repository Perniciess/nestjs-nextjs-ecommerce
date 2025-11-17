import { SignUpForm } from '@/features/auth'
import { UiFormPageLayout } from '@/shared/ui/layouts/ui-layout-form-page'

export default function SignUpPage() {
    return (
        <UiFormPageLayout
            title="Регистрация"
            form={<SignUpForm />}
        />
    )
}
