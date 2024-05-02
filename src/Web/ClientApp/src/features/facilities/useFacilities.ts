import { useQuery } from "react-query";
import axiosClient from "../../utils/axiosClient";

export const useFacilities = () => {
  const { data, isLoading, isError, error } = useQuery("facilities", () =>
    axiosClient
      .get("/facilities")
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );
  // using react-query and axios to fetch data
  return { data, isLoading, isError, error };
};
