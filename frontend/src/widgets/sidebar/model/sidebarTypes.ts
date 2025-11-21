export interface ISidebarItem {
    id: number
    label: string
    icon: () => JSX.Element
    href: string
}

export interface ISidebarProps {
    items: ISidebarItem[]
    logo?: string
    sidebar_route: string
    pathname: string | null
}
