import { useQuery } from "react-query";
import { getRepairRequestById } from "../api/get-by-id.api";

export const useGetRepairRequestById = (id) => {
  const { data, isError, isLoading } = useQuery(["repairRequest", id], () =>
    getRepairRequestById(id)
  );
  return { data, isError, isLoading };
};
