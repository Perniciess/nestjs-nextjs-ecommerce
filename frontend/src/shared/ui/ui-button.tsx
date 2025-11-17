import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export type UiButtonVariant = 'black' | 'white' | 'gray'

export type UiButtonProps = {
    variant: UiButtonVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

export function UiButton({ className, variant, ...props }: UiButtonProps) {
    return (
        <button
            {...props}
            type="submit"
            className={clsx(
                className,
                'flex h-10  cursor-pointer items-center justify-center gap-2 rounded-md px-4',
                {
                    black: 'text-white bg-zinc-950 hover:bg-zinc-800',
                    white: 'text-black bg-white  outline outline-[#CBD5E1]',
                    gray: 'text-zinc-500 bg-zinc-100 hover:bg-zinc-200',
                }[variant],
            )}
        >
        </button>
    )
}
