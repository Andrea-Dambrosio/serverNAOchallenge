import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import style from "../styles/controlPanel.module.css"


const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, { auth: { token: "Pannello Controllo" } });
socket.on("connection", (socket) => {
  socket.join("constrolpanel");
});
export default function Handle() {
    const [connectedDevices, setConnectedDevices] = useState([]);

    useEffect(() => {
        socket.on('connected devices', (devices) => {
            console.log(devices)
            setConnectedDevices(devices);
        });

        // Pulizia dell'effetto quando il componente si smonta
        return () => {
            socket.off('connected devices');
        };
    }, []);

    return (
      <>
        <h1 className={style.title}>Pannello di Controllo</h1>

        <aside className={style.connections}>
          <h2>Dispositivi Connessi:</h2>
          <ol>
            {connectedDevices.map((device) => (
              <li className={style.list}>
                {" "}
                Ip: <span className="green">{device.ip}</span> <br />
                Nome: <span className="green">{device.nome}</span>
                <br /> Id connessione:{" "}
                <span className="green">{device.id}</span>
              </li>
            ))}
          </ol>
          <button type = "button" onClick={() => socket.emit("counterzero")}>Azzera Counter Domande</button>
        </aside>

      </>
    );
}
