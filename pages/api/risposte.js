// api/mostraprodotto
import io from "socket.io-client";

const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, {
  auth: { token: "api/risposte" },
});

export default function Handle(req, res) {
  if (req.method !== "POST") {
    res.status(405).end("Method not allowed");
  }

  try {
    socket.emit("risposta ricevuta", req.body);
    res.status(200).end("Risposta Ricevuta");
  } catch (e) {
    res.status(405).end("Id non ricevuto. " + e);
    console.log("\x1b[31m", "api/aggiungiprodotto: " + e);
  }
}
