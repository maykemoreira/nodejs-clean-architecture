import { SurveyMongoRepository, SurveyResultMongoRepository } from '@/infra/db'
import { DbLoadSurveyResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
