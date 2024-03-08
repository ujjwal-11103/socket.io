// const express = require("express")
import express from "express"; //and not {}
import { Server } from "socket.io";
import { createServer } from 'http'

const app = express();
const server = createServer(app)
const io = new Server(server)

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello chat")
})



app.listen(port, () => {
    console.log(`server running at port ${port}:`);
})


