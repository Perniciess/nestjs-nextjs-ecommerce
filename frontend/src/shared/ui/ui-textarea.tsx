import type { PropsWithRef, TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'
import { useId } from 'react'

export interface UiTextAreaProps {
    className?: string
    label?: string
    placeholder?: string
    textareaProps?: PropsWithRef<TextareaHTMLAttributes<HTMLTextAreaElement>>
}

export function UiTextArea({ className, placeholder, label, textareaProps }: UiTextAreaProps) {
    const id = useId()
    return (
        <div className={clsx(className, 'flex flex-col gap-1')}>
            {label !== null && (
                <label htmlFor={id} className="block">
                    {label}
                </label>
            )}
            <textarea
                {...textareaProps}
                placeholder={placeholder}
                id={id}
                className={clsx(textareaProps?.className, 'h-20 resize-none rounded-md border px-3 py-2 outline-none')}
            />
        </div>
    )
}
