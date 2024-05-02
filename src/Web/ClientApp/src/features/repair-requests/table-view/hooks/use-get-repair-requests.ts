import { useQuery } from "react-query";
import { getAllRepairRequests } from "../api/get-all.api";
/**
 * This hook is used to get all repair requests from the API and the state of data fetching
 * @returns {object} - { data, isError, isLoading }
 */
export const useGetRepairRequests = () => {
  const { data, isError, isLoading } = useQuery("repairRequests", () =>
    getAllRepairRequests()
  );
  return { data, isError, isLoading };
};
