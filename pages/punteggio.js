import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, { auth: { token: "Visualizza Punteggio" } });

export default function Page() {
    const [punteggioBlu, setBlu] = useState(0);
    const [punteggioRossi, setRossi] = useState(0);
    
    useEffect(() => {
        // Listen for incoming messages
        socket.on('recive point', (data) => {
            setBlu(data.blu);
            setRossi(data.rossi)
        });
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
