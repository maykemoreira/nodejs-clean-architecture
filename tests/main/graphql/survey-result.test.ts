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

describe('SurveyResult GraphQL', () => {
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

  describe('SurveyResult Query', () => {
    const surveyResultQuery = gql`
        query surveyResult ($surveyId: String!) {
          surveyResult(surveyId: $surveyId){
              question
              answers {
                  answer
                  count
                  percent
                  isCurrentAccountAnswer
              }
              date
          }
        }
    `
    test('Should return SurveyResult', async () => {
      const now = new Date()
      const accessToken = await mockAccessToken()
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        },
        {
          answer: 'Answer 2',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
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
      const res: any = await query(surveyResultQuery, {
        variables: {
          surveyId: surveyRes.ops[0]._id.toString()
        }
      })
      expect(res.data.surveyResult.question).toBe('Question')
      expect(res.data.surveyResult.date).toBe(now.toISOString())
      expect(res.data.surveyResult.answers).toEqual([{
        answer: 'Answer 1',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      },
      {
        answer: 'Answer 2',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }])
    })
  })
})
