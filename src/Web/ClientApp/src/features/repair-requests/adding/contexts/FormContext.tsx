/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from "react";
type RepairRequestFormContextProps = {
  formData: any;
  updateFormData: (updatedData: any) => void;
};
export const FormContext = createContext<RepairRequestFormContextProps | null>(
  null
);
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (updatedData) => {
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
