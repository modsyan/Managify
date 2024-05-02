import { useParams } from "react-router-dom";
import { repairRequestsData } from "../data/repair-requests";
import { RepairRequest } from "../types/repair-request-form";
import { AddRepairRequest } from "./add-repair-request";
function getRepairRequest(id: string): RepairRequest {
  return repairRequestsData.find(
    (request) => request.reportNumber === id
  ) as unknown as RepairRequest;
}

export const EditRepairRequest = () => {
  const { id } = useParams();
  const repairRequest = getRepairRequest(id!);

  return <AddRepairRequest repairRequest={repairRequest} />;
};
