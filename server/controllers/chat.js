function sendMessage(req, res) {
    const db = req.app.get('db');
    const { userid } = req.params
    const { content, name} = req.body
    db.chats
    .insert(
        {
            userId: userid,
            name: name,
            content: content,
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