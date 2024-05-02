import { z } from "zod";

// Define Zod schemas for each step's fields
const stepOneSchema = z.object({
  repairReportNumber: z.number(),
  reportingDate: z.string(),
  location: z.string(),
  office: z.string(),
  numberOfOffice: z.number(),
  numberOfFloor: z.number(),
  numberOfFlat: z.number(),
  faultType: z.string(),
});

const stepTwoSchema = z.object({
  faultLocation: z.string(),
  suitableDateToAttend: z.string(),
  hour: z.string(), // You might need to adjust this based on time format
  faultDescription: z.string(),
});

const stepThreeSchema = z.object({
  technicalName: z.string(),
  supervisorName: z.string(),
  reportingDateContractor: z.string(),
  assetName: z.string(),
  contractorNotes: z.string(),
  isFixed: z.boolean(),
  notRepairingCauseHelp: z.string(),
});

const stepFourSchema = z.object({
  employeeName: z.string(),
  employeeDate: z.string(),
  employeeNotes: z.string(),
});

const stepFiveSchema = z.object({
  adminName: z.string(),
  adminDate: z.string(),
  adminNotes: z.string(),
});

// Add more schemas as needed for additional steps...

// Group the schemas for each step
const schemas = [
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
  stepFiveSchema,
];

export default schemas;
