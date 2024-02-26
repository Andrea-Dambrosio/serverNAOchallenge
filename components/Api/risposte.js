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
                return [risposte.items, "prodotto_scelto" ,[119]]; //cacioricotta capra

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
                risposte.risposte.push("mucca");
                if (risposte.risposte[0] == true) {
                    risposte.items[3].value = "Intenso";
                    risposte.next = "stagionatura";
                } else {
                    risposte.deactivate.linear(7);
                    risposte.deactivate.point([3, 4]);
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
                    return [risposte.items, "prodotto_scelto", [86]];
                }
                
                    risposte.deactivate.linear(5)
                    risposte.next = "stagionatura";
                break;

            case "delicato":
                risposte.items[3].value = "Delicato";
                if (risposte.risposte[0] == true) {
                    return [risposte.items, "prodotto_scelto", [108]];
                }
                risposte.deactivate.point([4, 2])
                // risposte.items[2].value = "Fresco";
                risposte.next = "spalmabile";
                break;
            default:
                return "errore"
                break

        }
        return risposte.items;
    },

    stagionatura: (risposta) => {
        switch (risposta) {
            case "stagionato":
                risposte.items[2].value = "Stagionato";

                if (risposte.risposte[0] == true)
                    return [risposte.items, "prodotto_scelto", [64]]; //caciocavallo

                if (risposte.risposte[1] == "bufala")
                    risposte.next = "piccante";

                if (risposte.risposte[1] == "mucca") {
                    risposte.deactivate.point([5])
                    risposte.next = "particolare";
                }
                break;
            case "fresco":
                risposte.items[2].value = "Fresco";
                if (risposte.risposte[0] == true || risposte.risposte[1] == "bufala") {
                    risposte.deactivate.linear(5)
                    risposte.deactivate.point([4])
                    return [risposte.items, "prodotto_scelto", [86]]; //scamorza
                }
                risposte.deactivate.point([6])
                risposte.next = "spalmabile";
                break;
                default:
                return "errore"
                break;
        }
        return risposte.items;
    },

    piccante: (risposta) => {
        if (risposta == "si") {
            risposte.items[4].value = true;
            risposte.risposte.push(true);
            return [risposte.items, "prodotto_scelto", [112]]; //caciocavallo peperoncino
        }
        if (risposta != "no") return "errore"
        risposte.items[4].value = false;
        risposte.risposte.push(false);
        return [risposte.items, "prodotto_scelto", [80]]; //ricotta salata
    },

    spalmabile: (risposta) => {
        
        if (risposta == "si") {
            risposte.items[5].value = true;
            risposte.risposte.push(true);
            if (risposte.risposte[1] == "bufala") {
                risposte.deactivate.linear(6)
                return [risposte.items, "prodotto_scelto", [84]]; //fior di ricotta
            }

            return [risposte.items, "prodotto_scelto", [4]]; //caso re vacca

        }
        if (risposta != "no") return "errore"
        risposte.items[5].value = false;
        risposte.risposte.push(false);
        if (risposte.risposte[1] == "bufala") {
            risposte.next = "particolare";
        }
        else {
            return [risposte.items, "prodotto_scelto", [130]]; //fiordilatte
        }
        risposte.items[5].value = false;
        risposte.risposte.push(false);
        return risposte.items
    },

    particolare: (risposta) => {
        if (risposta == "si") {
            risposte.items[6].value = true;
            if (risposte.risposte[1] == "bufala") {
                risposte.deactivate.point([8])
                risposte.next = "olio";
                return risposte.items
            }
            return [risposte.items, "prodotto_scelto", [187, 14]]; //caciocavallo affinato, scamorza affumicata
        }
        if(risposta != "no") return "errore"
        risposte.items[6].value = false;
        if (risposte.risposte[1] == "bufala") {
            risposte.deactivate.point([7])
            risposte.next = "grandezza";
            return risposte.items
        }
        return [risposte.items, "prodotto_scelto", [107]]; //provolone cilento
    },
    olio: (risposta) => {
        risposte.deactivate.point([8])

        if (risposta == "si") {
            risposte.items[7].value = true;
            return [risposte.items, "prodotto_scelto", [114]]; //bufala cuore olio
        }
        if(risposta != "no" ) return "errore"
        risposte.items[7].value = false;
        return [risposte.items, "prodotto_scelto", [170, 8]]; //mozzarella mortella, treccia bufala

    },
    grandezza: (risposta) => {
        risposte.deactivate.point([7])
        switch (risposta) {
            case "piccolo":
                risposte.items[8].value = "Piccolo";
                return [risposte.items, "prodotto_scelto", [85]]; //bocconcini bufala
            case "medio":
                risposte.items[8].value = "Medio";
                return [risposte.items, "prodotto_scelto", [108]]; //mozzarella bufala
            case "grande":
                risposte.items[8].value = "Grande";
                return [risposte.items, "prodotto_scelto", [17]]; //Maxi mozzarella bufala
            default:
                return "errore"
                break;
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
    if (items[1] != "prodotto_scelto") this.socket.emit("risposta", items);
    else {
        this.socket.emit("risposta", items[0]);
        this.socket.emit("prodottoScelto", items[2]);
        res.status(200).end("Il prodotto è stato scelto");
        return items[2]
        }
        res.status(200).end("Risposta inviata correttamente alla pagina");
        return

},
}
export default sceltaProdotto;