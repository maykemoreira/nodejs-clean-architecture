import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      try {
        const account = await this.loadAccountByToken.load(httpRequest.headers['x-access-token'])
        if (account) {
          return ok({ accountId: account.id })
        }
      } catch (error) {
        return serverError(error)
      }
    }
    return forbidden(new AccessDeniedError())
  }
}
