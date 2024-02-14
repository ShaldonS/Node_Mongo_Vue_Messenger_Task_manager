const { Router } = require('express')
const Message = require('../../models/Message')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const MessageList = await Message.find()
        if (!MessageList) throw new Error('No MessageList found')
        res.status(200).json(MessageList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const todo = await newMessage.save()
        if (!todo) throw new Error('Something went wrong while saving')
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Message.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong while deleting')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router