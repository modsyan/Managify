import { RepairRequest } from "../../types";

export const initRepairRequestData: RepairRequest = {
  assetType: "",
  contractorNotes: "",
  reportingDate: Date.now().toLocaleString(),
  facility: "",
  level: "",
  resourceAssetType: "",
  faultDescription: "",
  attendsAt: Date.now().toLocaleString(),
  //   get current hour and minute
  attendsOn: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
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
