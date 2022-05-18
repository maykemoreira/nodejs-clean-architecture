import { LoadSurveysRepository, LoadSurveyByIdRepository, AddSurveyRepository } from '@/data/protocols'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/../tests/domain/mocks'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  surveyModel = mockSurveyModel()
  callsCount = 0

  async loadById (id: string): Promise<SurveyModel> {
    this.callsCount++
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  accountId: string
  surveyModels = mockSurveyModels()

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveyModels)
  }
}
