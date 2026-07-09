const mongoose = require('mongoose')
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
})

describe('GET requests', () => {
  test('returns 200', async () => {
    await api
          .get('/api/blogs')
          .expect(200)
  })

  test('length 0 with empty db', async () => {
    await api
          .get('/api/blogs')
          .expect(200)

    const res = await api.get('/api/blogs');
    
    assert.strictEqual(res.body.length, 0);
  })

  test('length 1 with one entry', async () => {
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

  test('entries have "id"', async () => {
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
})


describe('POST requests', () => {

  test('returns 201', async () => {
    const requestBody = {
      title: "x",
      author: "x",
      url: "x",
      likes: 2
    }

    await api
            .post('/api/blogs')
            .send(requestBody)
            .expect(201)
  })

  test('saves entry in db', async () => {
    const requestBody = {
      title: "x",
      author: "x",
      url: "x",
      likes: 2
    }

    await api
            .post('/api/blogs')
            .send(requestBody)

    const res = await api.get('/api/blogs');

    assert(res.body.length);
  })

  test('saves entry with right fields', async () => {
    const requestBody = {
      title: "x",
      author: "x",
      url: "x",
      likes: 2
    }

    await api
            .post('/api/blogs')
            .send(requestBody)

    const res = await api.get('/api/blogs')

    assert.strictEqual(requestBody.title, res.body[0].title);
  })

  test('likes defaults to 0', async () => {
    const requestBody = {
      title: "x",
      author: "x",
      url: "x",
    }

    await api
            .post('/api/blogs')
            .send(requestBody)

    const res = await api.get('/api/blogs')

    assert.strictEqual(res.body[0].likes, 0)
  })
})

after(async () => {
  await mongoose.connection.close();
})
