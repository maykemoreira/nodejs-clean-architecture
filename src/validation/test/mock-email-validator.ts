import { EmailValidator } from '@/validation/protocols/email-validator'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidationStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidationStub()
}
