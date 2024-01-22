import io from "socket.io-client";
const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, {
    auth: { token: "api/informazioni" },
});

export default function handler(req, res) {

    if(req.method ==! 'POST'){
        res.status(405).json({response: 'method not allowed'})
        return
    }
    
    try{
        socket.emit("informazioni", req.body.id);
        console.log("api/arduino: id ricevuto " + req.body.id)
        res.status(200).json({response: 'id ricevuto correttamente'})
    }
    catch(e){
        res.status(500).json({response: 'errore'})
    }
    
}