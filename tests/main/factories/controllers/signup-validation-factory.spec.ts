import { makeSignupValidation } from '@/main/factories'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, EmailValidation } from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
