import { HttpRequest, HttpResponse, Middleware, LoadAccountByToken } from './auth-middleware-protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      try {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
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
