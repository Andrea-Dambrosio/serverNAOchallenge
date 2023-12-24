import io from "socket.io-client";
import defaultItems from "../../components/Scelta/defaultItems";
import { faSwimmer } from "@fortawesome/free-solid-svg-icons";
const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, {
    auth: { token: "api/app" },
});

export default function Handle(req, res) {
    if (req.method !== "POST") {
        res.status(405).end("Method not allowed");
    }

    try {
        if (req.body.tipo == "informazioni") {
            informazioni(req.body.id);
            return;
        }

        sceltaProdotto(req.body.risposta, res);
    } catch (e) {
        res.status(500).end("Errore: " + e);
        console.log("\x1b[31m", "api/app: " + e);
    }
}

function informazioni(id) {
    socket.emit("informazioni", id);
    res.status(200).end("Informazioni Ricevute");
}

const risposte = {
    next: "lattosio",
    risposte: [],
    items: JSON.parse(JSON.stringify(defaultItems)),
    reset: function () {
        this.next = "lattosio";
        this.risposte = [];
        this.items = JSON.parse(JSON.stringify(defaultItems));
    },
    callNext: function (risposta) {
        return risposte[risposte.next](risposta);
    },

    deactivate: {
        point: function (indexes) {
            indexes.forEach((index) => {
                risposte.items[index].value = "deactive";
            });
        },

        linear: function (startIndex) {
            risposte.items.forEach((item, index) => {
                if (index >= startIndex) {
                    item.value = "deactive";
                }
            });
        },
    },
    lattosio: (risposta) => {
        if (risposta == "si") {
            risposte.deactivate.linear(4);
            risposte.items[0].value = true;
            risposte.risposte.push(true);
        } else if (risposta == "no") {
            risposte.items[0].value = false;
            risposte.risposte.push(false);
        }
        risposte.next = "animale";
        return risposte.items;
    },

    animale: (risposta) => {
        switch (risposta) {
            case "capra":
                risposte.deactivate.linear(1);
                risposte.items[1].value = "Capra";
                return [risposte.items, "cacioricottaCapra"];

            case "bufala":
                risposte.items[1].value = "Bufala";
                if (risposte.risposte[0] == true) {
                    risposte.items[2].value = "Fresco";
                    risposte.next = "gusto";
                } else {
                    risposte.risposte.push("bufala");
                    risposte.next = "gusto";
                }
                break;

            case "mucca":
                risposte.items[1].value = "Mucca";
                if (risposte.risposte[0] == true) {
                    risposte.items[3].value = "Intenso";
                    risposte.next = "stagionatura";
                } else {
                    risposte.deactivate.linear(8);
                    risposte.next = "stagionatura";
                }
                break;
        }
        return risposte.items;
    },

    gusto: (risposta) => {
        switch (risposta) {
            case "intenso":
                risposte.items[3].value = "Intenso";

                if (risposte.risposte[0] == true) {
                    return [risposte.items, "scamorza"];
                }

                risposte.next = "stagionatura";
                break;

            case "delicato":
                risposte.items[3].value = "Delicato";
                if (risposte.risposte[0] == true) {
                    return [risposte.items, "mozzarellabufala"];
                }
                risposte.items[2].value = "Fresco";
                risposte.next = "spalmabile";
                break;
        }
        return risposte.items;
    },

    stagionatura: (risposta) => {
        switch (risposta) {
            case "stagionato":
                if (risposte.risposte[0] == true) {

                    return [risposte.items, "caciocavallo"];
                }
                if (risposte.risposte[1] == "bufala") {
                    risposte.next = "piccante";
                }
                if (risposte.risposte[1] == "mucca") {
                    risposte.next = "particolare";
                }

                risposte.items[2].value = "Stagionato";
                break;
            case "fresco":
                if (
                    risposte.risposte[0] == true ||
                    risposte.risposte[1] == "bufala"
                ) {
                    return [risposte.items, "scamorza"];
                }

                risposte.items[2].value = "Fresco";
                risposte.next = "spalmabile";
                break;
        }
        return risposte.items;
    },
};
let index = 0;
const sceltaProdotto = (risposta, res) => {
    if (risposta == "modulo") {
        risposte.reset();
        socket.emit("modulo");
        res.status(200).end("Informazioni Ricevute");
        return;
    }
    const items = risposte.callNext(risposta);

    if (typeof items[1] != "string") socket.emit("risposta", items);
    else {
        console.log(items[0]);
        socket.emit("risposta", items[0]);
        socket.emit("prodottoScelto", items[1]);
    }

    res.status(200).end("Informazioni Ricevute");
};
