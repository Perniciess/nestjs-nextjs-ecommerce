import { ROUTES } from '@/shared/routing/routes'
import { sidebarItemsAdmin } from '@/widgets/sidebar/model/sidebarConstants'
import { UiSidebar } from '@/widgets/sidebar/ui/ui-sidebar'

export function UiLayoutAdminPage({
    children,
    title,
    description,
    pathname,
}: {
    children: React.ReactNode
    title: string
    description: string
    pathname: string | null
}) {
    return (
        <div className="flex w-5/6">
            <UiSidebar items={sidebarItemsAdmin} logo="Панель администратора" sidebar_route={ROUTES.ADMIN_INDEX} pathname={pathname} />
            <div className="flex min-h-screen grow flex-col">
                <div className="ml-4 flex grow flex-col space-y-2 px-4 pb-4 pt-2">
                    <div className="">
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
