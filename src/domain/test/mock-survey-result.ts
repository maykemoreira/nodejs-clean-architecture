import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import faker from 'faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: faker.random.uuid(),
  accountId: faker.random.uuid(),
  answer: faker.random.word(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.random.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.word(),
      count: faker.random.number({ min: 0, max: 1000 }),
      percent: faker.random.number({ min: 0, max: 100 }),
      isCurrentAccountAnswer: faker.random.boolean()
    },
    {
      answer: faker.random.word(),
      count: faker.random.number({ min: 0, max: 1000 }),
      image: faker.image.imageUrl(),
      percent: faker.random.number({ min: 0, max: 100 }),
      isCurrentAccountAnswer: faker.random.boolean()
    }
  ],
  date: faker.date.recent()
})

export const mockEmptySurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.random.uuid(),
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
