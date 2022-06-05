import {
  LoadSurveysRepository, LoadSurveyByIdRepository,
  AddSurveyRepository, CheckSurveyByIdRepository
} from '@/data/protocols'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/../tests/domain/mocks'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyRepository.Params

  async add (data: AddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  result = mockSurveyModel()
  callsCount = 0

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.callsCount++
    this.id = id
    return await Promise.resolve(this.result)
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

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  id: string
  result = true
  callsCount = 0

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.callsCount++
    this.id = id
    return await Promise.resolve(this.result)
  }
}
