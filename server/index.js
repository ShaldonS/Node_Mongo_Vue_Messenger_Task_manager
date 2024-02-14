const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const TodoListRoutes = require('./routes/api/TodoList')
const MessengerRoutes = require('./routes/api/Messenger')
const path = require('path')
require('dotenv').config();

var serveStatic = require('serve-static');

app.use(serveStatic(__dirname + "/dist"));
app.use(cors())
app.use(bodyParser.json())

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/todoList', TodoListRoutes)
app.use('/api/messenger', MessengerRoutes)

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))

//\"npm run start:client\""