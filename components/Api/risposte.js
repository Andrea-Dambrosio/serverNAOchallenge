import defaultItems from "../../components/Scelta/defaultItems";

const risposte = {
    next: "lattosio",
    risposte: [],
    items: structuredClone(defaultItems),
    reset: function () {
        this.next = "lattosio";
        this.risposte = [];
        this.items = structuredClone(defaultItems)
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
        else{
            return "errore"
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
            default:
                return "errore"
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
                risposte.deactivate.linear(6)
                risposte.next = "stagionatura";
                break;

            case "delicato":
                risposte.items[3].value = "Delicato";
                if (risposte.risposte[0] == true) {
                    return [risposte.items, "mozzarellabufala"];
                }
                risposte.deactivate.point([4])
                risposte.items[2].value = "Fresco";
                risposte.next = "spalmabile";
                break;
            default:
                return "errore"

        }
        return risposte.items;
    },

    stagionatura: (risposta) => {
        switch (risposta) {
            case "stagionato":
                risposte.items[2].value = "Stagionato";

                if (risposte.risposte[0] == true)
                    return [risposte.items, "caciocavallo"];

                if (risposte.risposte[1] == "bufala")
                    risposte.next = "piccante";

                if (risposte.risposte[1] == "mucca") {
                    risposte.deactivate.point([6])
                    risposte.next = "particolare";
                }

                break;
            case "fresco":
                risposte.items[2].value = "Fresco";
                if (risposte.risposte[0] == true || risposte.risposte[1] == "bufala") {
                    risposte.deactivate.linear(6)
                    risposte.deactivate.point([4])
                    return [risposte.items, "scamorza"];
                }
                risposte.deactivate.point([7])
                risposte.next = "spalmabile";
                break;
                default:
                    return "errore"
        }
        return risposte.items;
    },

    piccante: (risposta) => {
        if (risposta == "si") {
            risposte.items[4].value = true;
            risposte.risposte.push(true);
            return [risposte.items, "caciocavalloPeperoncino"];
        }
        if (risposta != "no") return "errore"
        risposte.items[4].value = false;
        risposte.risposte.push(false);
        return [risposte.items, "ricottaSalata"];
    },

    spalmabile: (risposta) => {

        if( risposta != "si " && risposta != "no") return "errore"
        if (risposta == "si") {
            risposte.items[6].value = true;
            risposte.risposte.push(true);
            if (risposte.risposte[1] == "bufala") {
                deactive.linear(7)
                return [risposte.items, "fior_ricotta"];
            }

            return [risposte.items, "Caso re vacca"];

        }
        risposte.items[6].value = false;
        risposte.risposte.push(false);
        if (risposte.risposte[1] == "bufala") {
            risposte.next = "particolare";
        }
        else {
            return [risposte.items, "fiordilatte"];
        }
        risposte.items[6].value = false;
        risposte.risposte.push(false);
        return risposte.items
    },

    particolare: (risposta) => {
        if (risposta == "si") {
            risposte.items[7].value = true;
            if (risposte.risposte[1] == "bufala") {
                deactivate.point([9])
                risposte.next = "olio";
                return risposte.items
            }
            return [risposte.items, ["caciotta", "scamorzaAffumicata"]];
        }
        if(risposta != "no") return "errore"
        risposte.items[7].value = false;
        if (risposte.risposte[1] == "bufala") {
            deactivate.point([8])
            risposte.next = "grandezza";
            return risposte.items
        }
        return [risposte.items, "provoloneCilento"];
    },
    olio: (risposta) => {
        risposte.deactivate.point([9])

        if (risposta == "si") {
            risposte.items[8].value = true;
            return [risposte.items, "bufalaCuoreOlio"];
        }
        if(risposta != "no" ) return "errore"
        risposte.items[8].value = false;
        return [risposte.items, ["mozzarellaMortella", "trecciaBufala"]];

    },
    grandezza: (risposta) => {
        risposte.deactivate.point([8])
        switch (risposta) {
            case "piccolo":
                risposte.items[9].value = "Piccolo";
                return [risposte.items, "bocconciniBufala"];
            case "medio":
                risposte.items[9].value = "Medio";
                return [risposte.items, "mozzarellaBufala"];
            case "grande":
                risposte.items[9].value = "Grande";
                return [risposte.items, "maxiMozzarella"];
            default:
                return "errore"
        }
    },


};

const sceltaProdotto = {
    setSocket: function(socket) {
        this.socket = socket
    },
    scelta: function(risposta, res) {
    if (risposta == "modulo") {
        risposte.reset();
        this.socket.emit("modulo");
        res.status(200).end("Informazioni Ricevute");
        return;
    }
    const items = risposte.callNext(risposta);
    if ( items == "errore"){
        res.status(200).end("Risposta non valida")
        return
    }
    if (typeof items[1] != "string") this.socket.emit("risposta", items);
    else {
        console.log(items[1]);
        this.socket.emit("risposta", items[0]);
        this.socket.emit("prodottoScelto", items[1]);
        res.status(200).end("Il prodotto è stato scelto");
        return items[1]
        }
        res.status(200).end("Risposta inviata correttamente alla pagina");
        return

},
}
export default sceltaProdotto;