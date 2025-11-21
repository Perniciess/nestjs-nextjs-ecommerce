import { UiBasketIcon } from '@/shared/ui/icons/basket-icon'
import { UiButton } from '@/shared/ui/ui-button'
import { useState } from 'react'

export function UiBasketModal() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>
                <UiBasketIcon className="mr-2" />
            </button>
            {showModal
                ? (
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 size-full bg-zinc-950 opacity-40"
                                onClick={() => setShowModal(false)}
                            >
                            </div>
                            <div className="flex min-h-screen items-center px-4 py-8">
                                <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
                                    <div className="mb-4 mt-2 text-left">
                                        <h4 className="text-lg font-medium text-zinc-950">Корзина</h4>
                                    </div>
                                    <UiButton variant="black">Перейти к оформлению</UiButton>
                                </div>
                            </div>
                        </div>
                    )
                : null}
        </>
    )
}
