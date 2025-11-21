import type { ISidebarProps } from '../model/sidebarTypes'
import { UiLink } from '@/shared/ui/ui-link'
import clsx from 'clsx'

export const UiSidebar = ({ items, logo, sidebar_route, pathname }: ISidebarProps) => {
    return (
        <aside className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white">
            <div className="flex h-16 items-center justify-center border-b border-zinc-200">
                <UiLink variant="none" href={sidebar_route}>
                    <p className="items-center text-3xl text-zinc-950">ITEMCLUB</p>
                    {logo}
                </UiLink>
            </div>

            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2 p-4">
                    {items.map(item => (
                        <UiLink
                            variant="none"
                            key={item.id}
                            href={item.href}
                            className={clsx(
                                'flex items-center rounded-lg p-2',
                                pathname === item.href && 'bg-zinc-950 text-white',
                                pathname !== item.href && 'hover:bg-zinc-200',
                            )}
                        >
                            <span className="mr-3">{item.icon()}</span>
                            <span>{item.label}</span>
                        </UiLink>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
