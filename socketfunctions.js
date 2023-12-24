let punteggioBlu = 0
let punteggioRossi = 0
let connectedDevices = []


//aumenta e ritorna punteggio
exports.getPoint = function (squad){

        switch (squad) {
            case "rossi":
                punteggioRossi++;
                break;
            case "blu":
                punteggioBlu++;
                break;
            default:
                console.log("\x1b[33m", "Nessuna Squadra Ricevuta");
                break;
        }

        return { blu: punteggioBlu, rossi: punteggioRossi }
}

//aggiorna e restituisce lista dei dispositivi
exports.deviceList = function (sockets){

    let index = 0;
    connectedDevices = [];
    for (let [id, socket] of sockets) {

      connectedDevices.push({
        nome: socket.handshake.auth.token,
        ip: socket.handshake.address,
        id: id,
        conn: socket.connected,
      });


    }
    console.log(connectedDevices)
    return connectedDevices;
}

exports.reset = function(){
    punteggioBlu = 0
    punteggioRossi = 0
}
//trova id del pannello di controllo
exports.getConnID = function(name){

    const devices = connectedDevices.filter((device) => device.nome == name);

    if (devices.length === 0) {
      console.log(
        "\x1b[31m",
        `${name} richiesto ma non connesso. Apri ${name}. O Pagina non esistente`
      );
      return 0;
    }

    return devices
}
//
exports.getIp = function (ip){
    if (ip == process.env.LOCALHOST_IP)
        return ip + " (SERVER HOST)"
    else
        return ip
}

