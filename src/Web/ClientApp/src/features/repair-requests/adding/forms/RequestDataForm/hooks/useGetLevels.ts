import { useQuery } from "react-query";
import { getLevels } from "../api/get-levels.api";
/**
 * This hook is used to get levels for a facility from the API using react-query library attached with state of data, isError and isLoading
 * @param facilityId
 * @returns {data, isError, isLoading}
 */
export const useGetLevels = (facilityId: string) => {
  const {
    data: levels,
    isError,
    isLoading,
  } = useQuery(["levels", facilityId], () => getLevels(facilityId));

  return { levels, isError, isLoading };
};
