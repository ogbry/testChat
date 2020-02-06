const express = require('express')
const massive = require('massive');
const socketio = require('socket.io')
const http = require('http')
require('dotenv').config()

const users = require('./controllers/users.js')
const chats = require('./controllers/chat.js')

massive({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
}).then(db => {

    const app = express();
    const server = http.createServer(app)

    app.set('db', db);
    app.use(express.json());
    const io = socketio(server)

    io.on('connection', (socket) => {
        console.log('Connected');

        socket.on('join', ({id, user}) => {
            console.log(`${user} has joined`)
        })

        socket.on('logout', ({user}) => {
            console.log(`${user} has logged out`)
        })

        socket.on('chat', data =>{
            io.sockets.emit('chat', data)
        })

        socket.on('disconnect', () => {
            console.log(`Disconnected`)
        })
    })

    app.post('/api/register', users.register);
    app.post('/api/login', users.login);

    app.post('/api/message/:userid', chats.sendMessage)
    app.get('/api/getMessages', chats.getMessages)
    app.delete('/api/deleteMessages/:id', chats.deleteOldChats)

    const PORT = process.env.SERVER_PORT

    server.listen(PORT, () => {
        console.clear()
        console.log(`Server is listening to PORT ${PORT}`)
    })
})