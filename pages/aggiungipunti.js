import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import io from 'socket.io-client';

const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, { auth: {token: "Conta" }});


export default function Home() {
  const [selectedSquad, setSelectedSquad] = useState("blu");

  

  const handleButtonClick = () => {
    console.log(selectedSquad)
    socket.emit('send point', selectedSquad);
  };

  const handleSelectChange = (event) => {
    setSelectedSquad(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Conta Punteggio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Conta punteggio da cestino</h1>
      <p>Seleziona Squadra</p>

      <select id="squad" value={selectedSquad} onChange={handleSelectChange}>
        <option value="blu">Squadra Blu</option>
        <option value="rossi">Squadra Rossi</option>
      </select>
      {process.env.CARLO}
      <button
        type="button"
        style={{ marginTop: "50px" }}
        onClick={handleButtonClick}
      >
        PUNTO!
      </button>
    </>
  );
}
