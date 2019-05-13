const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server');

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:758e334a-5a1d-4660-8590-24de4fb4637f",
  key: "651c8427-5d1d-4fe8-ac94-8564fc936151:6dJqkmwnBLJ9zzurElq7kLxcKJ2kmAdHnAHeXcdgQ6U=",
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body;

  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.statusCode).json(error);
      }
  })
})

const PORT = 3001
app.listen(PORT, err => {
if (err) {
console.error(err)
} else {
console.log(`Running on port ${PORT}`)
}
})
