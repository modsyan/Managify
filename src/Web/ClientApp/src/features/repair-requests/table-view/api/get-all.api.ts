import axiosClient from "../../../../utils/axiosClient";
import { RepairRequestFormDTO } from "../../shared/types";

export const getAllRepairRequests = (): Promise<RepairRequestFormDTO[]> => {
  return axiosClient
    .get<RepairRequestFormDTO[]>("/repair-requests")
    .then((res) => res.data)
    .catch((err) => err);
};
