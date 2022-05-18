
import { makeDbAuthentication, makeLoginValidation, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols/controller'
import { LoginController } from '@/presentation/controllers'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
