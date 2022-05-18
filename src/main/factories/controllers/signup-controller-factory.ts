import {
  makeDbAuthentication, makeDbAddAccount,
  makeLogControllerDecorator, makeSignupValidation
} from '@/main/factories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
