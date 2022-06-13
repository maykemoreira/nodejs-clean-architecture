import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { makeApolloServer } from './helpers'
import { Collection } from 'mongodb'
import { createTestClient } from 'apollo-server-integration-testing'
import { ApolloServer, gql } from 'apollo-server-express'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'

let accountCollection: Collection
let surveyCollection: Collection
let apolloServer: ApolloServer

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  },
  {
    $set: {
      accessToken: accessToken
    }
  })
  return accessToken
}

describe('Survey GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('Surveys Query', () => {
    const surveysQuery = gql`
        query surveys {
            surveys {
                id
                question
                answers {
                    image
                    answer
                }
                date
                didAnswer
            }
        }
    `
    test('Should return surveys', async () => {
      const now = new Date()
      const accessToken = await mockAccessToken()
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        },
        {
          answer: 'Answer 2'
        }],
        date: now
      })
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })
      const res: any = await query(surveysQuery)
      expect(res.data.surveys.length).toBe(1)
      expect(res.data.surveys[0].id).toBeTruthy()
      expect(res.data.surveys[0].question).toBe('Question')
      expect(res.data.surveys[0].date).toBe(now.toISOString())
      expect(res.data.surveys[0].didAnswer).toBe(false)
      expect(res.data.surveys[0].answers).toEqual([{
        answer: 'Answer 1',
        image: 'http://image-name.com'
      },
      {
        answer: 'Answer 2',
        image: null
      }])
    })
  })
})
