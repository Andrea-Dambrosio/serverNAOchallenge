// pages/first-page.js
import React, { useState, useEffect } from 'react';


export default function Page() {
    const [punteggioBlu, setBlu] = useState(0);
    const [punteggioRossi, setRossi] = useState(0)

    useEffect(() => {
        const fetchPunteggio = async () => {
            const response = await fetch('/api/punteggio');
            const data = await response.json();
            setBlu(data.blu);
            setRossi(data.rossi);
        };

        // Effettua la prima richiesta al caricamento della pagina
        fetchPunteggio();

        // Imposta un intervallo per effettuare richieste periodicamente
        const intervalId = setInterval(fetchPunteggio, 500); // Ogni 5 secondi, ad esempio

        // Pulisci l'intervallo quando il componente viene smontato
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <h1>Punteggio Blu: {punteggioBlu}</h1>
            <h1>Punteggio Rossi: {punteggioRossi}</h1>
        </>
    );
}

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

