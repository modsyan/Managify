import * as React from "react";
import { createContext, useState } from "react";
import {
  RepairRequest,
  RepairRequestFormContextProps,
} from "../types/repair-request-form";

// Create the context with the correct type
export const FormContext = createContext<RepairRequestFormContextProps>(
  {} as RepairRequestFormContextProps
);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialFormData: RepairRequest = {
    assetType: "",
    contractorNotes: "",
    reportingDate: "",
    facility: "",
    level: "",
    resourceAssetType: "",
    faultDescription: "",
    attendsAt: "",
    attendsOn: "",
    technicianName: "",
    supervisorName: "",
    contractorReportingDate: "",
    fixed: false,
    cause: "",
    employeeName: "",
    employeeDate: "",
    employeeNotes: "",
    employeeSatisfiedFixing: false,
    adminName: "",
    adminDate: "",
    adminNotes: "",
    area: "",
  };
  const [data, setData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleCounterUpdate = (id: string, value: number) => {
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // check if requestData is filled
  const requestDataFilled: boolean =
    !!data.reportingDate &&
    !!data.resourceAssetType &&
    !!data.assetType &&
    !!data.area &&
    !!data.facility &&
    !!data.level;
  // check if faultData is filled
  const faultDataFilled: boolean =
    !!data.faultDescription && !!data.attendsAt && !!data.attendsOn;
  // check if employeeData is filled
  const employeeDataFilled: boolean =
    !!data.employeeName &&
    !!data.employeeDate &&
    !!data.employeeNotes &&
    !!data.employeeSatisfiedFixing;
  // check if managerData is filled
  const managerDataFilled =
    !!data.adminName && !!data.adminDate && !!data.adminNotes;
  // check if contractorData is filled
  const contractorDataFilled =
    !!data.technicianName &&
    !!data.supervisorName &&
    !!data.contractorReportingDate &&
    !!data.fixed &&
    !!data.cause;
  // check if all fields of requestData is filled

  const AllDataFilled =
    !!requestDataFilled &&
    !!faultDataFilled &&
    !!employeeDataFilled &&
    !!managerDataFilled &&
    !!contractorDataFilled;
  const canSubmit = () => {
    return AllDataFilled;
  };

  const [page, setPage] = useState<number>(1);
  // check all fields of requestData is filled using Object.keys
  return (
    <FormContext.Provider
      value={{
        data,
        setData,
        page,
        setPage,
        handleChange,
        canSubmit,
        requestDataFilled,
        faultDataFilled,
        employeeDataFilled,
        managerDataFilled,
        contractorDataFilled,
        handleCounterUpdate,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
