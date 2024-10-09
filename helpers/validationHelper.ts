import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import { IUserGenerateOtpPostDataType, IUserLoginPostDataType } from "../interfaces/IUserDataType";
import { userLoginPostRequestSchema, userRegistrationPostRequestSchema } from "../schema/requestSchema/userRequestPutPostSchemal";
import { IExamMockTestPostDataType } from "../interfaces/IMockTestDataType";
import { examMockTestPostRequestSchema } from "../schema/requestSchema/mockTestRequestPutPostSchema";
import { ITestQuestionsPostDataType } from "../interfaces/IQuestionDataType";
import { testQuestionsPostRequestSchema } from "../schema/requestSchema/questionRequestPutPostSchema";

export class ValidationHelper {
 private _ajv = new Ajv({ useDefaults: true, allErrors: true });
 private _userRegistrationPostCompiledSchema: ValidateFunction<IUserGenerateOtpPostDataType>;
 private _userLoginPostCompiledSchema: ValidateFunction<IUserLoginPostDataType>;
 private _examMockTestPostCompiledSchema: ValidateFunction<IExamMockTestPostDataType>;
 private _testQuestionsPostCompiledSchema: ValidateFunction<ITestQuestionsPostDataType>;

 constructor() {
  this._userRegistrationPostCompiledSchema = this._ajv.compile(userRegistrationPostRequestSchema);
  this._userLoginPostCompiledSchema = this._ajv.compile(userLoginPostRequestSchema)
  this._examMockTestPostCompiledSchema = this._ajv.compile(examMockTestPostRequestSchema)
  this._testQuestionsPostCompiledSchema = this._ajv.compile(testQuestionsPostRequestSchema)
 }
 public ifSpecialCharExist(str: string): boolean {
  const pattern = /[\!\@\#\$\%\^\&\*\(\)\+\=\}\{\]\[\\\|\:\;\?\/\>\.\<\~]/;
  return pattern.test(str);
 }

 userGenerateOtpPostRequest(data: unknown, type: "query" | "body"): { invalid: false; reason: ErrorObject[]; data: IUserGenerateOtpPostDataType; }
 userGenerateOtpPostRequest(data: unknown, type: "query" | "body"): { invalid: true; reason: ErrorObject[]; data: undefined; }
 userGenerateOtpPostRequest(data: unknown, type: "query" | "body"): { invalid: boolean; reason: ErrorObject[]; data?: IUserGenerateOtpPostDataType; } {
  return this._validateData(this._userRegistrationPostCompiledSchema, data, type);
 }

 userLoginPostRequest(data: unknown, type: "query" | "body"): { invalid: false; reason: ErrorObject[]; data: IUserLoginPostDataType; }
 userLoginPostRequest(data: unknown, type: "query" | "body"): { invalid: true; reason: ErrorObject[]; data: undefined; }
 userLoginPostRequest(data: unknown, type: "query" | "body"): { invalid: boolean; reason: ErrorObject[]; data?: IUserLoginPostDataType; } {
  return this._validateData(this._userLoginPostCompiledSchema, data, type);
 }

 examMockTestPostRequest(data: unknown, type: "query" | "body"): { invalid: false; reason: ErrorObject[]; data: IExamMockTestPostDataType; }
 examMockTestPostRequest(data: unknown, type: "query" | "body"): { invalid: true; reason: ErrorObject[]; data: undefined; }
 examMockTestPostRequest(data: unknown, type: "query" | "body"): { invalid: boolean; reason: ErrorObject[]; data?: IExamMockTestPostDataType; } {
  return this._validateData(this._examMockTestPostCompiledSchema, data, type);
 }

 testQuestionsPostRequest(data: unknown, type: "query" | "body"): { invalid: false; reason: ErrorObject[]; data: ITestQuestionsPostDataType; }
 testQuestionsPostRequest(data: unknown, type: "query" | "body"): { invalid: true; reason: ErrorObject[]; data: undefined; }
 testQuestionsPostRequest(data: unknown, type: "query" | "body"): { invalid: boolean; reason: ErrorObject[]; data?: ITestQuestionsPostDataType; } {
  return this._validateData(this._testQuestionsPostCompiledSchema, data, type);
 }
 
 
 

 private _validateData<T>(validateFunction: ValidateFunction<T>, data: unknown, type: "query" | "body") {
  if (validateFunction(data)) {
   return {
    invalid: false,
    reason: [],
    data: data
   }
  } else {
   if (!validateFunction.errors) {
    return {
     invalid: true,
     reason: []
    }
   }
   return {
    invalid: true,
    reason: validateFunction.errors.map((err) => ({
     instancePath: err.instancePath,
     params: err.params,
     message: err.message,
    })) as ErrorObject[]
   }
  }

 }

 public static get singleton() {
  if (!st) {
   st = new ValidationHelper();
  }
  return st;
 }

}
let st: ValidationHelper;