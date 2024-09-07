import { JSONSchemaType } from "ajv";
import { IUserRegisterPostDataType } from "../../interfaces/IUserDataType";

export const userRegistrationPostRequestSchema: JSONSchemaType <IUserRegisterPostDataType> = {
 $schema: "http://json-schema.org/draft-07/schema#",
 type: "object",
 properties: {
  name: { type: "string" },
  email: { type: "string" }
 },
 required: ["name", "email"],
 additionalProperties: false
};