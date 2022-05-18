
import {
  makeDbSaveSurveyResult, makeLogControllerDecorator,
  makeDbLoadSurveyById
} from '@/main/factories'
import { Controller } from '@/presentation/protocols/controller'
import { SaveSurveyResultController } from '@/presentation/controllers'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
