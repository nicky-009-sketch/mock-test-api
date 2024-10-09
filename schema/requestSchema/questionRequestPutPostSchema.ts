import { JSONSchemaType } from "ajv";
import { ITestQuestionsPostDataType } from "../../interfaces/IQuestionDataType";

export const testQuestionsPostRequestSchema: JSONSchemaType <ITestQuestionsPostDataType> = {
 $schema: "http://json-schema.org/draft-07/schema#",
 type: "object",
 properties: {
  testId: { type: "string" },
 },
 required: ["testId"],
 additionalProperties: false
};
