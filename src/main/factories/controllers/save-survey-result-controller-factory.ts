
import {
  makeDbSaveSurveyResult, makeLogControllerDecorator,
  makeDbLoadAnswersBySurvey
} from '@/main/factories'
import { Controller } from '@/presentation/protocols/controller'
import { SaveSurveyResultController } from '@/presentation/controllers'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
