import { UiIconSearch } from '@/shared/ui/icons/search-icon'
import { UiTextField } from '@/shared/ui/ui-text-field'
import { useState } from 'react'

export function UiSearchModal() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>
                <UiIconSearch className="mr-2" />
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
                                    <div className="mb-4 mt-2">
                                        <div className="text-center">
                                            <h4 className="text-lg font-medium text-zinc-950">Поиск товаров</h4>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <UiTextField className="w-3/4" inputProps={{ className: 'rounded-l-md' }} />
                                        <button type="submit">
                                            <UiIconSearch className="mb-1 rounded-r bg-zinc-950" color="white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                : null}
        </>
    )
}
