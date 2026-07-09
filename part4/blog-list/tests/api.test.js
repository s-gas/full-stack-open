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

test('GET request with empty db', async () => {
  await api
        .get('/api/blogs')
        .expect(200)

  const res = await api.get('/api/blogs');
  
  assert.strictEqual(res.body.length, 0);
})

test('GET request with one entry', async () => {
  const blog = new Blog(
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 2
      }
  )

  await blog.save()

  const res = await api.get('/api/blogs');

  assert.strictEqual(res.body.length, 1);
});

test('GET request returns entries with "id"', async () => {
  const blog = new Blog(
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 2
      }
  )
 
  await blog.save()

  const res = await api.get('/api/blogs');
  
  assert(Object.keys(res.body[0]).includes('id'));
})

after(async () => {
  await mongoose.connection.close();
})
