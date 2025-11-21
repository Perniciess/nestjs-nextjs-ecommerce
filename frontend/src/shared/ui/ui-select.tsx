import type { PropsWithRef, SelectHTMLAttributes } from 'react'
import clsx from 'clsx'

export interface UiSelectProps {
    className?: string
    options: { id: number, value: string, label: string }[]
    selectProps?: PropsWithRef<SelectHTMLAttributes<HTMLSelectElement>>
    label: string
}

export function UiSelect({ className, options, selectProps, label }: UiSelectProps) {
    return (
        <div className={clsx('flex flex-col', className)}>
            <label className="mb-2 mr-2">{label}</label>
            <select
                {...selectProps}
                className={clsx('w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-zinc-950')}
            >
                {options.map(option => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
