import { useQuery } from "react-query";
import { getAllRepairRequests } from "../api/get-all.api";
/**
 * This hook is used to get all technical reports from the API and the state of data fetching
 * @returns {object} - { data, isError, isLoading }
 */
export const useGetTechnicalReports = () => {
  const { data, isError, isLoading } = useQuery("technicalReports", () =>
    getAllRepairRequests()
  );
  return { data, isError, isLoading };
};
