const mongoose = require('mongoose')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
})

test('200 for GET requests', async () => {
  await api
        .get('/api/blogs')
        .expect(200)
})

test('empty array with empty db', async () => {
  await api
        .get('/api/blogs')
        .expect(200)

  const res = await api.get('/api/blogs');
  
  assert.strictEqual(res.body.length, 0);
})

after(async () => {
  await mongoose.connection.close();
})
