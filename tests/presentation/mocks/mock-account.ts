import { AccountModel } from '@/domain/models/account'
import { AddAccount, Authentication, LoadAccountByToken } from '@/domain/usecases'
import { mockAccountModel } from '@/../tests/domain/mocks'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccount.Params
  isValid = true

  async add (account: AddAccount.Params): Promise <AddAccount.Result> {
    this.addAccountParams = account
    return this.isValid
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authentication
    return await Promise.resolve(this.authenticationModel)
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string
  accountModel = mockAccountModel()

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}
