import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { setupApp } from '@/main/config/app'
import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { Express } from 'express'

let app: Express
let accountCollection: Collection

describe('Login GraphQL', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const query = `query {
        login(email: "any_email@mail.com", password: "123") {
            accessToken
            name
        }
      }`

    test('Should return an account on valid credentials', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      const res = await request(app)
        .post('/graphql')
        .send({
          query
        })
      expect(res.status).toBe(200)
      expect(res.body.data.login.accessToken).toBeTruthy()
      expect(res.body.data.login.name).toBe('any_name')
    })

    test('Should return UnauthorizedError on invalid credentials', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({
          query
        })
      expect(res.status).toBe(401)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Mutation', () => {
    const query = `
      mutation {
        signUp(name: "any", email: "any_email@mail.com", password: "123", passwordConfirmation: "123") {
          accessToken
          name
        }
      }
    `

    test('Should return an account on valid data', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({
          query
        })
      expect(res.status).toBe(200)
      expect(res.body.data.signUp.accessToken).toBeTruthy()
      expect(res.body.data.signUp.name).toBe('any')
    })

    test('Should return EmailInUserError on invalid data', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      const res = await request(app)
        .post('/graphql')
        .send({
          query
        })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('The received email is already in use')
    })
  })
})
