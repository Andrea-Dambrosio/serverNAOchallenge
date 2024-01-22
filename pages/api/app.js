import io from "socket.io-client";
import sceltaProdotto from "../../components/Api/risposte";
const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, {     auth: { token: "api/app" },
});


sceltaProdotto.setSocket(socket) 

const response = {
    post: function(req,res){
    try {
        if (req.body.tipo != "scelta_prodotto") {
            res.status(400).end("Tipo non valido")
            return;
        }
        this.prodottoSelezionato = sceltaProdotto.scelta(
            req.body.risposta,
            res
        );
    } catch (e) {
        res.status(500).end("Errore: " + e);
        console.log("\x1b[31m", "api/app: " + e);
    }
    },
    get: function(req, res){
        if(this.prodottoSelezionato == undefined){
            return res.status(400).end("Prodotto ancora non identificato")
        }
        return res.status(200).end(JSON.stringify({id: this.prodottoSelezionato}))
    }
}
export default function Handle(req, res) {
    switch (req.method) {
        case "POST":
            response.post(req,res)
            break;
        case "GET":
            response.get(req,res)
            break;
        default:
        res.status(405).end("Method not allowed");
    }

}


