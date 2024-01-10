
const { Server } = require('socket.io');
const http = require('http');

const { getPoint, reset, deviceList, getConnID, getIp } = require("./socketfunctions.js");

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

    io.on('connection', (socket) => {
        //Recupero indirizzo ip e nome del nuova dispositivo connesso
        const nome = socket.handshake.auth.token
        const connIp = getIp(socket.handshake.address)       
        

        console.log(`SOCKET: ${nome} connesso. Ip: ${connIp} Id: ${socket.id}`)
        
        socket.on("send point", (squad) => {
            io.emit('recive point', getPoint(squad))
        })
 
        socket.on('reset', () => {
            reset()
            io.emit('recive point', getPoint());
            console.log("\x1b[33m", " SOCKET: Punteggio Azzerato")
        })

        //Aggiorna modulo
        socket.on("risposta", (form) => {
          io.emit("risposta", form);
        });

        //funzione per mostrare modulo
        socket.on("modulo", () => {
            io.emit("modulo")
        })

        socket.on("prodottoScelto", (id) => {
            io.emit("prodottoScelto", id)
        })
        socket.on('disconnect', () => {
            console.log(`SOCKET: ${nome} disconnesso. Ip: ${connIp} Id: ${socket.id}`)
        });
        socket.on('connect_error', (error) => {
            io.emit("modulo", error)
            console.log(error);
        });

    });
    

server.listen(3001,'0.0.0.0', () => {
    console.log(`Socket server listening on :3001`)
});

