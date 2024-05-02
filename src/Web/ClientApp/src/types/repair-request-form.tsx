import { ChangeEvent } from "react";

export type RequestData = {
  reportingDate: string;
  resourceAssetType: string;
  assetType: string;
  facility: string;
  level: string;
  area: string;
};

export type FaultData = {
  faultDescription: string;
  attendsAt: string;
  attendsOn: string;
};

export type ContractorData = {
  technicianName: string;
  supervisorName: string;
  contractorReportingDate: string;
  fixed?: boolean;
  cause: string;
  contractorNotes: string;
};

export type EmployeeData = {
  employeeName: string;
  employeeDate: string;
  employeeNotes: string;
  employeeSatisfiedFixing: boolean;
};

export type ManagerData = {
  adminName: string;
  adminDate: string;
  adminNotes: string;
};

export type RepairRequest = RequestData &
  FaultData &
  ContractorData &
  EmployeeData &
  ManagerData;
export type RepairRequestFormContextProps = {
  data: RepairRequest;
  setData: React.Dispatch<React.SetStateAction<RepairRequest>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleCounterUpdate: (id: string, value: number) => void;
  canSubmit: () => void;
  requestDataFilled: boolean;
  faultDataFilled: boolean;
  employeeDataFilled: boolean;
  managerDataFilled: boolean;
  contractorDataFilled: boolean;
};
