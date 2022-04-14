import {
  accountSchema, errorSchema, loginParamsSchema,
  surveyAnswerSchema, surveysSchema, surveySchema,
  signUpParamsSchema, addSurveyParamsSchema, surveyResultSchema,
  saveSurveyParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  signUpParams: signUpParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema
}
