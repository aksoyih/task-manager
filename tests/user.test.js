const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () =>{
    await request(app).post('/users').send({
        name: 'Haluk',
        email: 'i.halukaksoy@gmail.com',
        password: 'helloworld!'
    }).expect(201)
})