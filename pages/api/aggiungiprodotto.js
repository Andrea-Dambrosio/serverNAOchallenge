// api/mostraprodotto
import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io(`ws://${process.env.LOCALHOST_IP}:3001`, { auth: { token: "api/aggiungiprodotto" } });

export default function Handle(req, res){

    if(req.method !== 'POST'){
        res.status(405).end("Method not allowed");
    }
    
    try{
        console.log(req.body)
        socket.emit('prodotto ricevuto', req.body.id)
        res.status(200).end("Prodotto ricevuto")
    }catch(e){
        res.status(405).end("Id non ricevuto. " + e)
        console.log("\x1b[31m", "api/aggiungiprodotto: " + e)
    }
}
