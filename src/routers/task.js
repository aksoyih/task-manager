const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save() 
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id)

        if(!task){
            return res.status(404).send()
        }

        res.send(task)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({
            error: 'Invalid update parameters. (description[string], completed[boolean] are expected)'
        })
    }
    
    try {
        const _id = req.params.id
        
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        
        if(!task){
            return res.status(404).send()
        }
        
        res.send(task)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id)

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

module.exports = router
