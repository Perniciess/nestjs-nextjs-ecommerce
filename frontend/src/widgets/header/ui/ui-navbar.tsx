import { UiLink } from '@/shared/ui/ui-link'
import { NavbarPoints } from '../model/headerConstants'

export function UiNavbar() {
    return (
        <nav className="w-full">
            <div className="flex items-center justify-center">
                <ul className="flex items-center justify-center space-x-4">
                    {NavbarPoints.map(points => (
                        <li key={points.id} className="text-zinc-950 hover:text-zinc-400">
                            <UiLink variant="none" href={points.href}>
                                {points.tittle}
                            </UiLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
