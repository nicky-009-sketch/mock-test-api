import { JSONSchemaType } from "ajv";
import { IUserGenerateOtpPostDataType } from "../../interfaces/IUserDataType";

export const userRegistrationPostRequestSchema: JSONSchemaType <IUserGenerateOtpPostDataType> = {
 $schema: "http://json-schema.org/draft-07/schema#",
 type: "object",
 properties: {
  email: { type: "string" },
 },
 required: ["email"],
 additionalProperties: false
};