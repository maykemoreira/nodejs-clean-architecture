import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '@/presentation/errors'
import faker from 'faker'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

const field = faker.random.word()

describe('Required field validation', () => {
  test('Should return a missing param error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: faker.random.word() })
    expect(error).toEqual(new MissingParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
