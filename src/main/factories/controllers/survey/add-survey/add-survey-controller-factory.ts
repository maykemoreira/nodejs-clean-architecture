
import { makeAddSurveyValidation } from './add-survey-validation'
import { makeDbAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey-factory'
import { makeLogController } from '@/main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols/controller'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogController(controller)
}
