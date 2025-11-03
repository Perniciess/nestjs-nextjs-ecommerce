import type { AxiosError } from 'axios'

interface ErrorResponseData {
    message?: string | string[]
}

export function errorCatch(error: unknown): string {
    if (isAxiosError(error)) {
        const data = error.response?.data

        if (data && data.message !== undefined) {
            if (Array.isArray(data.message)) {
                return data.message[0] ?? 'An unknown error occurred'
            }
            else {
                return data.message
            }
        }
        else {
            return error.message || 'An unknown error occurred'
        }
    }
    else if (error instanceof Error) {
        return error.message
    }
    else {
        return 'An unknown error occurred'
    }
}

function isAxiosError(error: unknown): error is AxiosError<ErrorResponseData> {
    return (
        typeof error === 'object'
        && error !== null
        && (error as AxiosError).isAxiosError === true
    )
}
