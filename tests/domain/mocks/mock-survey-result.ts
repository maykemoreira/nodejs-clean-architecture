import { SaveSurveyResultParams } from '@/domain/usecases'
import { SurveyResultModel } from '@/domain/models'
import faker from 'faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  answer: faker.random.word(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.word(),
      count: faker.datatype.number({ min: 0, max: 1000 }),
      percent: faker.datatype.number({ min: 0, max: 100 }),
      isCurrentAccountAnswer: faker.datatype.boolean()
    },
    {
      answer: faker.random.word(),
      count: faker.datatype.number({ min: 0, max: 1000 }),
      image: faker.image.imageUrl(),
      percent: faker.datatype.number({ min: 0, max: 100 }),
      isCurrentAccountAnswer: faker.datatype.boolean()
    }
  ],
  date: faker.date.recent()
})

export const mockEmptySurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.word(),
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false
    },
    {
      answer: faker.random.word(),
      count: 0,
      image: faker.image.imageUrl(),
      percent: 0,
      isCurrentAccountAnswer: false
    }
  ],
  date: faker.date.recent()
})
