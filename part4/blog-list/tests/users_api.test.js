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
      username: "x",
      password: "x",
      name: "x",
    }

    await api
            .post(endpoint)    
            .send(payload)
            .expect(201);
  })
})

after(async () => {
  await mongoose.connection.close();
})
