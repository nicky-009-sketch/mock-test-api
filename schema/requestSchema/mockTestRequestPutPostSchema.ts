import { JSONSchemaType } from "ajv";
import { IExamMockTestPostDataType } from "../../interfaces/IMockTestDataType";

export const examMockTestPostRequestSchema: JSONSchemaType<IExamMockTestPostDataType> = {
 $schema: "http://json-schema.org/draft-07/schema#",
 type: "object",
 properties: {
  examId: { type: "string" },
  categoryId: { type: "string" },
 },
 required: ["examId", "categoryId"],
 additionalProperties: false
};


