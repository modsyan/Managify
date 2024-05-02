/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { getFacilities } from "../api/get-facilities.api";

export const useGetAllFacilities = () => {
  const { data, isError, isLoading } = useQuery("facilities", getFacilities);
  return { data: data as any[], isError, isLoading };
};
