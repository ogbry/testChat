const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

function register(req, res) {
  const db = req.app.get('db');
  const { username, password, plainPass } = req.body;
  
  db.users
  .find({username: username})
  .then(item => {
    if(item.length > 0){
        res.send({Message: `Username ${username} is already taken`})
    }
    else{
        argon2
        .hash(password)
        .then(hash => {
        return db.users.insert(
            {
            username,
            password: hash,
            plainPass
            }
        );
        })
        .then(user => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET);
        res.status(201).json({ ...user, token });
        })
        .catch(err => {
        console.error(err);
        res.status(500).end();
        });
    }
  })
  
}

module.exports ={
    register
}