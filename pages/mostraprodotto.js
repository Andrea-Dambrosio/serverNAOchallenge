
// import io from "socket.io-client"
// const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, { auth: { token: "mostraprodotto" } });

import { useEffect, useState } from 'react';
import { Events } from 'react-scroll';
import { animated, useSpring } from '@react-spring/web';
import { Attendi } from "../components/mostraprodottoComponent.js";
import Head from 'next/head';
import styles from "../styles/mostraprodotto.module.scss";



export default function Page() {
    const [displayContent, setDisplayContent] = useState(<Attendi/>)
    return (
        <>
            <Head>
                <title>Presenta Prodotto</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"></link>
                
            </Head>
            <content
                id={styles.mainDiv}
                >
                {displayContent}
                
                </content>
            
        </>
    )
}

