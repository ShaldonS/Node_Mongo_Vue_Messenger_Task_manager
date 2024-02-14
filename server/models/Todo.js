const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    executor: {
        type: String,
        required: false,
    },
    complexity: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    emergency: {
        type: String,
        required: false,
    },
    start_date: {
        type: String,
        required: false,
    },
    end_date: {
        type: String,
        required: false,
    },
})

const Todo = model('todo', TodoSchema)

module.exports = Todo