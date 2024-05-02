import { useQuery } from "react-query";
import { getQrCodesData } from "../api/get-all.api";

export const useGetQrCodes = () => {
  const { data, isLoading, isError } = useQuery("qrCodes", getQrCodesData);
  return { data, isLoading, isError };
};
