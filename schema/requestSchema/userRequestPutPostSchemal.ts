import { JSONSchemaType } from "ajv";
import { IUserGenerateOtpPostDataType, IUserLoginPostDataType } from "../../interfaces/IUserDataType";

export const userRegistrationPostRequestSchema: JSONSchemaType <IUserGenerateOtpPostDataType> = {
 $schema: "http://json-schema.org/draft-07/schema#",
 type: "object",
 properties: {
  email: { type: "string" },
 },
 required: ["email"],
 additionalProperties: false
};

export const userLoginPostRequestSchema: JSONSchemaType <IUserLoginPostDataType> = {
 $schema: "http://json-schema.org/draft-07/schema#",
 type: "object",
 properties: {
  email: { type: "string" },
  otp: {type:'number'}
 },
 required: ["email", "otp"],
 additionalProperties: false
};