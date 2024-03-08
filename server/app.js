import express from "express"; //and not {}
// const express = require("express")
import { Server } from "socket.io";
import { createServer } from 'http'
import { Socket } from "dgram";
import { log } from "console";
import cors from 'cors'

const app = express();                   //express app 
const server = createServer(app)         //http ke madat se hum server bna rhe hai or usme apna express app pass kr rhe hai as an argument 
const io = new Server(server, {          // idhr hum nya io ka server bna rhe hai or usme apna http wala server as an argument pass kiya hai
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})
// socket ka server bn chuka 

app.get('/', (req, res) => {
    res.send("Hello chat")
})

// ye ek event trigger hai jab koi client connect hoga toh ye trigger hojayega
io.on("connection", (socket) => {
    console.log("User Connected with Id :", socket.id);

    // ye code sab socket ko messag transfer krega 
    socket.emit('id1', "Welcome to the server")

    //ye code woh particular client ko chodke jisme refrsh hua baki sabko messag deliver krega
    socket.broadcast.emit('id1', `New User joined with ID = ${socket.id}`)


    socket.on('message', (mess) => {
        console.log(mess);
        // io.emit('message',mess)
        socket.broadcast.emit('message', mess)
    })


    // disconnect the user 
    socket.on('disconnect', () => {
        console.log("User Disconnected", socket.id);
    })
})


const port = 3000;

server.listen(port, () => {
    console.log(`server running at port ${port}:`);
})