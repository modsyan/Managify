import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";
/***
 * This hooks is used to get the context of the form of the repair request including all forms collected data
 * @returns {FormContext} The context of the form of the repair request
 * @throws {Error} If the hook is not used within a FormProvider
 * @example const { formData, updateFormData } = useRepairRequestFormContext();
 */

export function useRepairRequestFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
