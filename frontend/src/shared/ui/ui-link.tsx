import clsx from 'clsx'
import Link from 'next/link'

export type UiLinkVariant = 'black' | 'gray' | 'white' | 'none'

export type UiLinkProps = {
    variant: UiLinkVariant
} & Parameters<typeof Link>[0]

export function UiLink({ className, variant, ...props }: UiLinkProps) {
    return (
        <Link
            {...props}
            className={clsx(
                className,
                'cursor-pointer p-1',
                {
                    black: 'text-zinc-950',
                    gray: 'text-zinc-400 hover:text-zinc-300',
                    white: 'text-white hover:text-white',
                    none: '',
                }[variant],
            )}
        >
        </Link>
    )
}
