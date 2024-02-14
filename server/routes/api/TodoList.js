const { Router } = require('express')
const Todo = require('../../models/Todo')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const todoList = await Todo.find()
        console.log("OBJ: ", todoList)
        if (!todoList) throw new Error('No Todo List found')
        res.status(200).json(todoList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body)
    try {
        const todo = await newTodo.save()
        if (!todo) throw new Error('Something went wrong saving the Todo')
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/update:id', async (req, res) => {
    const { id, data } = req.params
    try {
        const updated = await Todo.findByIdAndUpdate(
            { _id: id }, 
            {
                name: data.name,
                description: data.description,
                executor: data.executor,
                complexity: data.complexity,
                status: data.status,
                emergency: data.emergency,
                start_date: data.start_date,
                end_date: data.end_date,
            },
        );
        if (!updated) throw new Error('Something went wrong saving the Todo')
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Todo.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router