// allow any for the entire file
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import axiosClient from "../../utils/axiosClient";

export const useLevels = () => {
  const { data, isLoading, isError, error } = useQuery("levels", () =>
    axiosClient.get("/levels").then((res) => res.data)
  );

  return { data, isLoading, isError, error };
};
