import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import io from 'socket.io-client';
import Link from 'next/link'


export default function Home() {

  return (
    <>
      <Head>
        <title>Conta Punteggio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Server NAOCHALLENGE 2023</h1>
      <h2>INDIRIZZO IP SERVER: {process.env.LOCALHOST_IP}</h2>
      <h3>PORTA SERVER: 3000 <br /> PORTA SOCKET: 3001</h3>
      <Link target="_blank" href="./punteggio.js">Punteggi gioco cestino Real Time</Link><br></br>
      <Link target="_blank" href="./controlpanel.js">Pannello di Controllo</Link><br></br>
      <Link target="_blank" href="./aggiungipunti.js">Aggiungi punti Gioco Cestini</Link><br></br>
    </>
  );
}
