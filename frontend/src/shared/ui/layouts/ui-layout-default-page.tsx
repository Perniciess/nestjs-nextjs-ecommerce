import { UiFooter } from '@/widgets/footer/ui/ui-footer'
import { UiHeader } from '@/widgets/header/ui/ui-header'

export function UiDefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <UiHeader />
            <div className="pt-20">{children}</div>
            <UiFooter />
        </>
    )
}
