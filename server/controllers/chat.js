function sendMessage(req, res) {
    const db = req.app.get('db');
    const { userid } = req.params
    const { content } = req.body

    db.chats
    .insert(
        {
            userId: userid,
            content: content
        }
    )
    .then(data => res.status(201).json(data))
}

function getMessages(req, res){
    const db = req.app.get('db')

    db.query(`SELECT * from chats`)
    .then(data => res.status(201).json(data))
}

function deleteOldChats(req, res){
    console.log('Deleting')
}


module.exports ={
    sendMessage,
    getMessages,
    deleteOldChats
}