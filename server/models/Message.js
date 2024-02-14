const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
    author: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: true,
    },
    files: {
        type: String,
        required: false,
    }
})

const Message = model('message', MessageSchema)

module.exports = Message