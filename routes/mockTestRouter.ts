import express, { Request, Response } from 'express';
import { ValidationHelper } from '../helpers/validationHelper';
import { mockTestModel } from '../models/mockTestModel';
import { instructionModel } from '../models/instructionModel';
const mockTestRouter = express.Router();
const vh = ValidationHelper.singleton;
const mtModel = new mockTestModel();
const insModel = new instructionModel();


mockTestRouter.post('/exam-tests', async (req: Request, res: Response) => {
 try {
  const validationResult = vh.examMockTestPostRequest(req.body, 'body')
  if (validationResult.invalid) {
   const reason = validationResult.reason[0];
   return res.status(417).json({ status: "Validationfailedure", message: reason });
  }
  const { examId } = req.body
  const mockTestRes = await mtModel.list(examId)
  const instructionText = `test_name,duration,positive_mark,negative_mark \n ssc cgl tier-1,3600,1,0.25 \n ssc cgl tier-2,360000,1,0.25`;
  const updateMockTests = mockTestRes?.map(async (test: any) => {
   const [instructionRes] = await insModel.findById(test.instruction_id) ?? []
   // const instructionText = instructionRes?.instruction_text
   return { ...test, instructionText }
  })
  const mockTests = await Promise.all([...updateMockTests || []])








  interface TableRow {
   [key: string]: string;
  }

  const convertStringToTable = (dataString: string): TableRow[] => {
   const rows = dataString.split('\n');
   const headers = rows[0].split(',');

   const tableData: TableRow[] = rows.slice(1).map(row => {
    const values = row.split(',');
    return headers.reduce((obj: TableRow, header, index) => {
     obj[header.trim()] = values[index]?.trim() || '';
     return obj;
    }, {} as TableRow);
   });

   return tableData;
  };

  const text = `This table shows the exam details:
 Here is some additional context.
 Here is some additional context.
 Please find the data below:
 test_name,duration,positive_mark,negative_mark
 ssc cgl tier-1,3600,1,0.25
 ssc cgl tier-2,360000,1,0.25
 ssc cgl tier-2,360000,1,0.25
 This is the conclusion.
 This is the conclusion.
 This is the conclusion.
 Thank you for your attention.`;


  const lines = text.split('\n');

  // Identify the first line that looks like a table header (contains commas)
  const headerIndex = lines.findIndex(line => line.includes(','));

  // Extract text above the table
  const aboveText = lines.slice(0, headerIndex).join('\n');

  // Extract data lines for the table
  const dataLines = lines.slice(headerIndex).filter(line => line.trim() !== '');

  // Find the index for footer text (if any)
  const footerIndex = dataLines.findIndex(line => !line.includes(','));
  const dataString = footerIndex === -1 ? dataLines.join('\n') : dataLines.slice(0, footerIndex).join('\n');

  // Extract footer text
  const belowText = footerIndex === -1 ? '' : dataLines.slice(footerIndex).join('\n');

  // Convert the data string to table data
  const tableData = convertStringToTable(dataString);

  // Display text above the table
  if (aboveText) {
   console.log(aboveText);
  }

  // Display the table
  console.table(tableData);

  // Display text below the table
  if (belowText) {
   console.log(belowText);
  }











  res.status(200).json({ status: "success", data: mockTests });
 } catch (error) {
  console.log(error)
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})

export { mockTestRouter }