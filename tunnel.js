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
        fetch(`http://127.0.0.1:8000/api/informazioni`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: req.body.id }),
        });
    });

    // Avvia il server Express sulla porta 4000
    app.listen(4000, () => {

        localtunnel({ port: 4000, subdomain: 'nao-challenge-2024'})
            .then(tunnel => {
                console.log(`Tunnel is open at ${tunnel.url}`);
                    subdomain(tunnel.url)
                

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

function subdomain(url) {
    const ftpClient = require('ftp-client'),
    config = {
        host: 'ftp.controllivallouno.netsons.org',
        port: 21,
        user: 'publichtml@controllivallouno.netsons.org',
        password: 'k1BG[c!WOxoZ'
    },
        options = {
            logging: 'basic',
            overwrite: 'all'
        },
        client = new ftpClient(config, options);

    client.connect(function () {
        const fs = require('fs');
        const localFilePath = 'url.txt';
        const remoteFilePath = '';

        fs.writeFileSync(localFilePath, url);

        console.log("Modifico l'url del tunnel su server in internet")
        client.upload([localFilePath], remoteFilePath, {
            baseDir: '',
            overwrite: 'all'
        }, function (result) {
            console.log(result);
        });
});
    

}
