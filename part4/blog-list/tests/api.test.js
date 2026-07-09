const app = require('../app')
const mongoose = require('mongoose')
const { test, after } = require('node:test')
const supertest = require('supertest')

const api = supertest(app);

test('200 for GET requests', async () => {
  await api
        .get('/api/blogs')
        .expect(200)
})

after(async () => {
  await mongoose.connection.close();
})
