import io from "socket.io-client";
const socket = io(`ws://127.0.0.1:3001`, {
    auth: { token: "api/qr" },
});

let currentId = null;   
let bool = true;
export default function Handle(req, res) {
   if(req.method == "POST"){
    console.log("ID ricevuto da qr code: " + req.body.id)
    currentId = req.body.id;
    res.status(200).end("OK");
   }
    else{
        if(currentId == null){
            res.status(200).end("null");
            if(bool) console.log("Pooling Iniziato"); bool = false
        }
        else{
            res.status(200).end(currentId);
            socket.emit("informazioni", currentId);
            console.log("api/qr: id ricevuto " + currentId)
            res.status(200).json({ response: 'id ricevuto correttamente da qr' })
            currentId = null
            bool = true
        }
    }
}