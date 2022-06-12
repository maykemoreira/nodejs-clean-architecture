import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
      surveyResult(surveyId: String!): SurveyResult! @auth
    }

    extend type Mutation {
      saveSurveyResult(surveyId: String!, answer: String!): SurveyResult! @auth
    }

    type SurveyResult {
        surveyId: String!
        question: String!
        answers: [Anwser!]!
        date: DateTime!
      }

    type Anwser {
        image: String
        answer: String!
        count: Int!
        percent: Int!
        isCurrentAccountAnswer: Boolean!
    }
`

export type SurveyResultModel = {
  surveyId: string
  question: string
  answers: SurveyResultAnswerModel[]
  date: Date
}

  type SurveyResultAnswerModel = {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }
