import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/save-survey-result/db-save-survey-result-protocols'
import { mockSaveSurveyModel } from '@/domain/test'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSaveSurveyModel())
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
