import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/models/authentication'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { mockAccountModel } from '@/../tests/domain/mocks'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccountParams
  accountModel = mockAccountModel()

  async add (account: AddAccountParams): Promise <AccountModel> {
    this.addAccountParams = account
    return await Promise.resolve(this.accountModel)
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
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
