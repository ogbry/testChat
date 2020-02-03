const express = require('express')
const socketio = require('socket.io')
const http = require('http')
require('dotenv').config()
const app = express();
const server = http.createServer(app)

const io = socketio(server)

io.on('connection', (socket) => {
    console.log('Connected');

    socket.on('join', ({name, password}) => {
        console.log(name, password)
    })

    socket.on('disconnect', () => {
        console.log("Disconnected")
    })
})

const PORT = process.env.SERVER_PORT

server.listen(PORT, () => {
    console.clear()
    console.log(`Server is listening to PORT ${PORT}`)
})