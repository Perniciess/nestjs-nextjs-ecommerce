import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { AppProvider } from './app-provider'

const inter = Inter({ subsets: ['latin'] })

export function App({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <div className={inter.className}>
                <Component {...pageProps} />
            </div>
        </AppProvider>
    )
}
