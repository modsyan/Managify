import { useQuery } from "react-query";
import { getTabsData } from "../api/get-tabs.api";

export const useGetMaintenanceTabs = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: "maintenance-tabs",
    queryFn: getTabsData,
  });
  return { data, isLoading, error, refetch };
};
