import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'
import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyResultRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyByIdRepository.loadBySurveyId(surveyId)
    return await Promise.resolve(null)
  }
}
