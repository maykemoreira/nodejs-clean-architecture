import { DbSaveSurveyResult } from './db-save-survey-result'
import { SurveyResultModel, SaveSurveyResultRepository, SaveSurveyResultParams } from './db-save-survey-result-protocols'
import MockDate from 'mockdate'

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
  ...makeFakeSurveyResultData(),
  id: 'any_id'
})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveResultRepository with correct values', async () => {
    const { saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
    const surveyResultData = makeFakeSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if SaveResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error())
      ))
    const promise = sut.save(makeFakeSurveyResultData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = await sut.save(makeFakeSurveyResultData())
    expect(surveyResultData).toEqual(makeFakeSurveyResult())
  })
})
