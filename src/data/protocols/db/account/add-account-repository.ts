import { AddAccount } from '@/domain/usecases'
import { AccountModel  } from '@/domain/models'

export interface AddAccountRepository {
  add: (data: AddAccountRepository.Params) => Promise<AccountModel>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = AccountModel
}
