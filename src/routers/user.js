const express = require('express')
const router = new express.Router()

const User = require('../models/user')



router.post('/users', async (req, res) => {
    
    const user = new User(req.body)

    try {
        await user.save() 
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
        console.log(error);

    }
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({}) 
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }

})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({
            error: 'Invalid update parameters. (name[string], email[string], password[string], age[int>0] are expected)'
        })
    }

    try {
        const _id = req.params.id

        const user = await User.findById(_id)

        updates.forEach((update) => user[update] = req.body[update])

        console.log(user.password);

        await user.save()
        
        if(!user){
            return res.status(404).send()
        }
        
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})


module.exports = router