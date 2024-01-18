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
            console.log("GET")
        //     fetch(`http://${process.env.LOCALHOST_IP}:3000/api/app`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ tipo:"informazioni", risposta: currentId })
        // })
            currentId = null
            bool = true
        }
    }
}