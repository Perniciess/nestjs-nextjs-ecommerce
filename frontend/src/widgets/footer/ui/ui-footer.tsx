import { ROUTES } from '@/shared/routing/routes'
import { UiLogo } from '@/shared/ui/icons/ui-logo-icon'
import { UiLink } from '@/shared/ui/ui-link'
import { FaInstagram, FaTelegramPlane, FaVk } from 'react-icons/fa'
import { footerDescriptions } from '../model/footerConstants'

export function UiFooter() {
    return (
        <footer className="flex items-center bg-zinc-950 px-3 py-10 text-white">
            <div className="ml-10 mt-6  flex flex-col items-center">
                <UiLink variant="none" href={ROUTES.HOME} className="flex flex-row items-center justify-center">
                    <UiLogo color="white" />
                    <p className="ml-1 text-lg">ITEMCLUB</p>
                </UiLink>

                <div className="flex flex-row items-start justify-center pt-4">
                    <FaTelegramPlane className="ml-1 size-6" />
                    <FaInstagram className="ml-4 size-6" />
                    <FaVk className="ml-4 size-6" />
                </div>
            </div>
            <div className="ml-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
                {footerDescriptions.map(perk => (
                    <div key={perk.id} className="ml-10 mt-6 flex flex-col items-start text-center">
                        <h3 key={perk.id} className="mr-4 text-xl text-zinc-500">
                            {perk.name}
                        </h3>
                        <div className="flex flex-col items-start justify-center">
                            {perk.description.map((item, index) => (
                                <UiLink key={perk.id} variant="white" href={perk.link[index]}>
                                    {item}
                                </UiLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </footer>
    )
}
