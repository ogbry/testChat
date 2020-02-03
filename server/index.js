const express = require('express')
const socketio = require('socket.io')
const http = require('http')
require('dotenv').config()
const app = express();
const server = http.createServer(app)

const io = socketio(server)



const PORT = process.env.SERVER_PORT

server.listen(PORT, () => {
    console.clear()
    console.log(`Server is listening to PORT ${PORT}`)
})