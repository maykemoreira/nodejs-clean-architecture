import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey/survey-result/survey-result-mongo-repository'
import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result'

export const makeDbLoadSurveyResult = (): DbLoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  const loadSurveyResult = new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
  return loadSurveyResult
}
