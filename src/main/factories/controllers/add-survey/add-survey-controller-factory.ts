
import { Controller } from '../../../../presentation/protocols/controller'
import { makeLogController } from '../../decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-validation'
import { makeDbAddSurvey } from '../../../factories/usecases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogController(controller)
}
