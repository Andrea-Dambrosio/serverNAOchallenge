// pages/api/punteggio.js
let punteggioBlu = 0;
let punteggioRossi = 0;

export default function handler(req, res) {
    switch (req.method) {

        case "GET":
            res.status(200).json({
                blu: punteggioBlu,
                rossi: punteggioRossi
            });
            break

        case "POST":
            const squad = JSON.parse(req.body).squad
            switch (squad) {

                case "blu":
                    punteggioBlu++
                    break
                case "rossi":
                    punteggioRossi++
                    break
                default:
                    res.status(400).json({ text: 'Bad Request' });
                    break
            }
            console.log(`Squadra blu: ${punteggioBlu} \n Squadra rossa: ${punteggioRossi}`)

            res.status(200).json({ text: 'Punteggio aggiornato correttamente' + punteggioBlu + "+ " + punteggioRossi });
            break
        case "DELETE":
            punteggioBlu = 0
            punteggioRossi = 0
            break
        default:
            res.status(405).json({ text: 'Method not allowed' });
            break
    }
}
