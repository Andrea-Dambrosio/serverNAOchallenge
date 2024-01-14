let currentId = null;   
export default function Handle(req, res) {
   if(req.method == "POST"){
    console.log("ID ricevuto da qr code: " + req.body.id)
    currentId = req.body.id;
    res.status(200).end("OK");
   }
    else{
        if(currentId == null){
            res.status(200).end("null");
            console.log("Nessun QR")
        }
        else{

            res.status(200).end(currentId);
            currentId = null
            console.log("GET")
        }
    }
}