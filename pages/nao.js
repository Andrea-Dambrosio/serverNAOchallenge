import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styles from "../styles/nao.module.scss"
import Head from "next/head";
import Sfondo from "../components/Attesa/Sfondo";
import Attesa from "../components/Attesa/Attesa";
import Form from "../components/Scelta/Form";
import ProdottoScelto from "../components/Scelta/ProdottoScelto";
import Presentazione from "../components/Scelta/ProdottoScelto";

 const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, {
   auth: { token: "nao" },
 });


export default function Page() {
  const [contentDisplayed, setContent] = useState(
      <Attesa />
  );
  const [transictionClass, setClass] = useState();
  useEffect(() => {
    // Listen for incoming messages
    socket.on("modulo", () => { show("form", "default") });
    socket.on("risposta", (form) => { show("form", form); console.log("risposta") })
    socket.on("prodottoScelto", (id) => { show("prodotto", id)})
    socket.on("informazioni", (id) => { show("presentazione", id)})

  }, []);

  //transizione
  function animation(component){
 
    setClass(styles.toLeft)
    setTimeout(() => {
      setClass(styles.fromRight);
      setContent(component)
      
    }, 2800);
  }
  //mostra il form
  function setForm(data) {
    
    if (data === "default"){
      animation(<Form items={"default"} />);
    }
    else{
      setContent(<Form items={data} />);
    }
    
    
  }
  //sceglie cosa mostrare
  function show(component, data) {
    switch (component) {
      case "form":
        setForm(data);
        break;
      case "prodotto":
        setTimeout(() => {animation(<ProdottoScelto ids={data} />)}, 1000)
        break;
      case "presentazione":
        setTimeout(() => { animation(<ProdottoScelto ids={data} />) }, 1000)
      default:
        console.log("default");
    }
  }

  return (
    <>
      <Head></Head>
      <content className={styles.content}>
        <Sfondo />

        <div className={[transictionClass, styles.animationBox].join(' ')}>{contentDisplayed}</div>
      </content>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
