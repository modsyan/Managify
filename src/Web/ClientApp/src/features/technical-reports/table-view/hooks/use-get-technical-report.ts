import { useQuery } from "react-query";
import { getTechnicalReportById } from "../api/get-by-id.api";

export const useGetTechnicalReportById = (id) => {
  const { data, isError, isLoading } = useQuery(["technicalReport", id], () =>
    getTechnicalReportById(id)
  );
  return { data, isError, isLoading };
};
