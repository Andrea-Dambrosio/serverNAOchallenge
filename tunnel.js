const express = require('express');
const localtunnel = require('localtunnel');
const cors = require('cors');
const bodyParser = require('body-parser')

    const app = express();
    app.use(bodyParser.json());       
    app.use(bodyParser.urlencoded({    
        extended: true
    })); 
    app.use(cors(
        {origin: "*"
    }
    ))
    // Gestisci le richieste GET alla radice
    app.post('/', (req, res) => {
        console.log(req.body.id)
        res.send(JSON.stringify("ID prodotto: " + req.body.id));
        fetch(`http://${process.env.LOCALHOST_IP}:3000/api/qr`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: req.body.id }),
        });
    });

    // Avvia il server Express sulla porta 3002
    app.listen(4000, () => {

        localtunnel({ port: 4000, subdomain: 'nao-challenge-2024'})
            .then(tunnel => {
                console.log(`Tunnel is open at ${tunnel.url}`);

                tunnel.on('error', (err) => {
                    console.log(err);
                });

                tunnel.on('request', (info) => {
                    // Gestisci le richieste al tunnel qui
                });

                tunnel.on('close', () => {
                    // I tunnel sono chiusi
                });
            })
            .catch(err => {
                console.error('Error while creating tunnel:', err);
            });
    });
