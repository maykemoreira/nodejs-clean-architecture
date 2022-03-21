import { LoadSurveys } from '../../../domain/usecases/load-surveys'
import { SurveyModel } from '../../../domain/models/survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository
  ) {}

  async load (): Promise<SurveyModel []> {
    await this.loadSurveysRepository.loadAll()
    return []
  }
}
