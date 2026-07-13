const mongoose = require('mongoose')
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app);

const endpoint = '/api/users'

beforeEach(async () => {
  await User.deleteMany({});
})

describe('GET requests', () => {
  test('returns 200', async () => {
    const payload = {
      username: "x",
      password: "x",
      name: "x",
    }
  
    await api
            .post(endpoint)
            .send(payload);
    
    await api
            .get(endpoint)
            .expect(200);
  })
})

describe('POST requests', () => {
  test('returns 201', async () => {
    const payload = {
      username: "xxx",
      password: "xxx",
      name: "x",
    }

    await api
            .post(endpoint)    
            .send(payload)
            .expect(201);
  })

  test('returns 400 when username is missing', async () => {
    const payload = {
      password: "xxx",
    }

    await api
            .post(endpoint)    
            .send(payload)
            .expect(400);
  })

  test('returns 400 when password is missing', async () => {
    const payload = {
      username: "xxx",
    }

    await api
            .post(endpoint)    
            .send(payload)
            .expect(400);
  })

  test('returns 400 when username is shorter than 3 characters', async () => {
    const payload = {
      username: "xx",
      password: "xxx",
    }

    await api
            .post(endpoint)    
            .send(payload)
            .expect(400);
  })

  test('returns 400 when password is shorter than 3 characters', async () => {
    const payload = {
      username: "xxx",
      password: "xx",
    }

    await api
            .post(endpoint)    
            .send(payload)
            .expect(400);
  })

  test('returns 400 when username already exists', async () => {
    const payload = {
      username: "xxx",
      password: "xxx",
    }

    await api
            .post(endpoint)
            .send(payload)

    await api
            .post(endpoint)    
            .send(payload)
            .expect(400);
  })
})

after(async () => {
  await mongoose.connection.close();
})
