import React, { useState } from 'react';
import Head from 'next/head';

function sendClick(squad) {
    fetch("/api/punteggio", {
        method: 'delete',
        body: JSON.stringify({
            data: "delete"
        })
    })
}

export default function Home() {


    return (
        <>
            <Head>
                <title>Azzera punteggi</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <button
                type="button"
                style={{ marginTop: "50px" }}
                onClick={sendClick()}
            >
                Azzera
            </button>
        </>
    );
}
