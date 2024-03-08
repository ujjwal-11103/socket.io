
// const express = require("express")
import express from "express"; //and not {}
import { Server } from "socket.io";
import { createServer } from 'http'
import { Socket } from "dgram";
import { log } from "console";
import cors from 'cors'

const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true
// }))

app.get('/', (req, res) => {
    res.send("Hello chat")
})

io.on("connection", (socket) => {
    console.log("User Connected");
    console.log("Id :", socket.id);
})

const port = 3000;
server.listen(port, () => {
    console.log(`server running at port ${port}:`);
})