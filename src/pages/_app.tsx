import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'jotai'
import { ChakraProvider } from '@chakra-ui/react'


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ChakraProvider resetCSS>
         <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
