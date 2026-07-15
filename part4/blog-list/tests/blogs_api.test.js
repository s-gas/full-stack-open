const mongoose = require('mongoose')
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app);

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = {
    username: "John",
    password: "djsjdks",
  }

  await api
        .post('/api/users')
        .send(user)

  const response = await api
                          .post('/api/login')
                          .send(user)

  token = response.body.token;
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)

    const res = await api.get('/api/blogs')

    assert.strictEqual(res.body[0].likes, 0)
  })


  test('returns 400 when missing required properties', async () => {
    const requestBody = {
      author: "x",
      url: "x",
    }

    await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)
            .expect(400)
  });
})


describe('DELETE requests', () => {
  test('returns 204', async () => {
    const requestBody = {
      title: "x",
      author: "x",
      url: "x",
    }

    const response = await api
                            .post('/api/blogs')
                            .set('Authorization', `Bearer ${token}`)
                            .send(requestBody)

    const id = response.body.id;
    await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
  })


  test('returns 400 with malformatted id', async () => {
    await api
            .delete(`/api/blogs/123`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
  })
})


describe('PUT requests', () => {
  test('returns 200', async () => {
    const requestBody = {
      title: "x",
      author: "x",
      url: "x",
    }

    const response = await api
                            .post('/api/blogs')
                            .set('Authorization', `Bearer ${token}`)
                            .send(requestBody)

    requestBody.title = "y";

    const id = response.body.id;
    await api
            .put(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(requestBody)
            .expect(200)

  })
  
  test('likes gets updated', async () => {
    const requestBody = {
      title: "x",
      author: "x",
      url: "x",
      likes: 1,
    }

    const responsePost = await api
                            .post('/api/blogs')
                            .set('Authorization', `Bearer ${token}`)
                            .send(requestBody)

    requestBody.likes++;

    const id = responsePost.body.id;
    const responsePut = await api
                          .put(`/api/blogs/${id}`)
                          .set('Authorization', `Bearer ${token}`)
                          .send(requestBody)

    assert.strictEqual(responsePut.body.likes, 2)
  })
})

after(async () => {
  await mongoose.connection.close();
})
