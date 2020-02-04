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

function login(req, res) {
  const db = req.app.get('db');
  const { username, password } = req.body;

  db.users
    .findOne(
      {
        username,
      },
      {
        fields: ['id', 'username', 'password'],
      }
    )
    .then(user => {
      if (!user) {
        throw new Error('Invalid username');
      }

      return argon2.verify(user.password, password).then(valid => {
        if (!valid) {
          throw new Error('Incorrect password');
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET);
        delete user.password; // remove password hash from returned user object
        res.status(200).json({ ...user, token });
      });
    })
    .catch(err => {
      if (
        ['Invalid username', 'Incorrect password'].includes(err.message)
      ) {
        res.status(400).json({ error: err.message });
      } else {
        console.error(err);
        res.status(500).end();
      }
    });
}


module.exports ={
    register, login
}