import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'
import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { Express } from 'express'

let surveyCollection: Collection
let accountCollection: Collection
let app: Express

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  },
  {
    $set: {
      accessToken: accessToken
    }
  })
  return accessToken
}

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /surveys', () => {
    test('Should return 403 on add survey success without access token', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          },
          { answer: 'Answer 2' }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey success with valid token', async () => {
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'admin'
      })
      const id = res.insertedId.toHexString()
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: res.insertedId
      },
      {
        $set: {
          accessToken: accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          },
          { answer: 'Answer 2' }
          ]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load survey success without access token', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 204 on load surveys with valid token', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
