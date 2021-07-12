const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')

const {userOne, userOneId, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () =>{
    const response = await request(app).post('/users').send({
        name: 'Jack',
        email: 'jack@example.com',
        password: 'helloworld!'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user:{
            name: 'Jack',
            email: 'jack@example.com'
        },
        token: user.tokens[0].token
    })

    expect(user).not.toBe('helloworld!')
})

test('Should login existing user', async ()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should NOT login non-existing user', async ()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "helloworld!"
    }).expect(400)
})

test('Should get profile for user', async () =>{
    await request(app).get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should NOT get profile for user', async () =>{
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user account', async () =>{
    const response = await request(app).delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should delete user account', async () =>{
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () =>{
    await request(app).post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update user', async () =>{
    await request(app).patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Ahmet'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Ahmet')
})

test('Should NOT update user', async () =>{
    await request(app).patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Istanbul'
        })
        .expect(400)
})