import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import { IUserRegisterPostDataType } from "../interfaces/IUserDataType";
import { userRegistrationPostRequestSchema } from "../schema/requestSchema/userRequestPutPostSchemal";

export class ValidationHelper {
 private _ajv = new Ajv({ useDefaults: true, allErrors: true });
 private _userRegistrationPostCompiledSchema: ValidateFunction<IUserRegisterPostDataType>;

 constructor() {
  this._userRegistrationPostCompiledSchema = this._ajv.compile(userRegistrationPostRequestSchema);
 }
 public ifSpecialCharExist(str: string): boolean {
  const pattern = /[\!\@\#\$\%\^\&\*\(\)\+\=\}\{\]\[\\\|\:\;\?\/\>\.\<\~]/;
  return pattern.test(str);
 }

 userRegisterPostRequest(data: unknown, type: "query" | "body"): { invalid: false; reason: ErrorObject[]; data: IUserRegisterPostDataType; }
 userRegisterPostRequest(data: unknown, type: "query" | "body"): { invalid: true; reason: ErrorObject[]; data: undefined; }
 userRegisterPostRequest(data: unknown, type: "query" | "body"): { invalid: boolean; reason: ErrorObject[]; data?: IUserRegisterPostDataType; } {
  return this._validateData(this._userRegistrationPostCompiledSchema, data, type);
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