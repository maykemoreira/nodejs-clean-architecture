import { AddAccountRepository } from '../../protocols/add-account-repository'
import { AccountModel, AddAccount, AddAccountModel, Encrypter } from '../add-account/db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly adddAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.adddAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.adddAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return await new Promise(resolve => {
      resolve(null)
    })
  }
}
