import { useQuery } from "react-query";
import axiosClient from "../../../../utils/axiosClient";

export const useFacilities = () => {
  const { data, isError, isLoading } = useQuery("facilities", () =>
    axiosClient
      .get("/facilities")
      .then((res) => res.data)
      .catch((err) => err)
  );
  return { data, isError, isLoading };
};
