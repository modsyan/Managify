import { useContext } from "react";
import { FormContext } from "../context/form-context";
// how to return handleChange type from useFormContext?
// how to return handleChange type from useFormContext?

const useFormContext = () => {
  return useContext(FormContext);
};

export default useFormContext;
