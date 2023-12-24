import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.css'
import { StrictMode } from "react";
import Head from 'next/head';
export default function MyApp({ Component, pageProps }) {
    return (
        <>
        <StrictMode>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
            </StrictMode>
        </>
    )
}