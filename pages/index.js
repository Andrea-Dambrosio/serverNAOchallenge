import React, { useState } from 'react';
import Head from 'next/head';

function sendClick(squad) {
  fetch("/api/punteggio", {
    method: 'post',
    body: JSON.stringify({
      squad: squad
    })
  })
}

export default function Home() {
  const [selectedSquad, setSelectedSquad] = useState("blu");

  const handleButtonClick = () => {
    sendClick(selectedSquad);
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
