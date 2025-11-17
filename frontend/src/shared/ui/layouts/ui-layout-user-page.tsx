import { ROUTES } from '@/shared/routing/routes'
import { sidebarItems } from '@/widgets/sidebar/model/sidebarConstants'
import { UiSidebar } from '@/widgets/sidebar/ui/ui-sidebar'

export function UiLayoutUserPage({
    children,
    title,
    description,
    pathname
}: {
    children: React.ReactNode
    title: string
    description: string
    pathname: string | null
}) {
    return (
        <div className="flex min-h-screen w-4/5">
            <UiSidebar items={sidebarItems} sidebar_route={ROUTES.HOME} pathname={pathname}/>
            <div className="flex grow flex-col">
                <div className="ml-4 flex flex-col space-y-2 px-4 pb-4 pt-2">
                    <div>
                        <p className="mt-4 text-xl font-semibold">{title}</p>
                        <p className="my-2 text-zinc-400">{description}</p>
                        <hr className="border-zinc-200" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
