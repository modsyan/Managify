import { Entity } from "../../../../types/general";

export type RequestDataFormDTO = {
  reportingData: string;
  facility: string;
  level: string;
  area: string;
  resourceAssetType: string;
  resourceAsset: string;
};

export type ContractorDataFormDTO = {
  technicianName: string;
  supervisorName: string;
  contractorReportingDate: string;
  fixed?: boolean;
  reason?: string;
  contractorNotes: string;
};

export type FaultDataFormDTO = {
  faultDescription: string;
  attendsAt: string; // HH:MM
  attendsOn: string; // YYYY-MM-DD
};

export type EmployeeDataFormDTO = {
  employeeName: string;
  employeeDate: string;
  employeeNotes: string;
  employeeSatisfiedFixing: boolean;
};

export type ManagerDataFormDTO = {
  managerName: string;
  managerDate: string;
  managerNotes: string;
};

// Union type of all the DTOs

export type RepairRequestFormDTO = RequestDataFormDTO &
  ContractorDataFormDTO &
  FaultDataFormDTO &
  EmployeeDataFormDTO &
  ManagerDataFormDTO &
  Entity;
