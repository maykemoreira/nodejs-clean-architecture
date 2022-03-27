
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogController } from '@/main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols/controller'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogController(controller)
}
