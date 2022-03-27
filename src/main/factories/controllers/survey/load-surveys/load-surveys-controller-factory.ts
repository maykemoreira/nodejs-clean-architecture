
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory'
import { makeLogController } from '@/main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols/controller'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogController(controller)
}
