import { z } from "zod";
import data from "../../data/lang.json";
export const RepairingRequestSchema = z.object({
  repair_report_number: z.number().min(0, { message: "repair_report_number" }),
  reporting_date: z.string().min(1, { message: data.ar.the_field_is_required }),
  location: z.string().min(1, { message: data.ar.the_field_is_required }),
  office: z.string().min(1, { message: data.ar.the_field_is_required }),
  number_of_office: z.number().min(0, { message: data.ar.min_number_is_one }),
  number_of_floor: z.number().min(0, { message: data.ar.min_number_is_one }),
  number_of_flat: z.number().min(0, { message: data.ar.min_number_is_one }),
  type_of_fault: z.string().min(1, { message: data.ar.the_field_is_required }),
});
