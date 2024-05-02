import { useQuery } from "react-query";
import { TechnicalReport } from "../types/technical-report";
import axiosClient from "../utils/axiosClient";

const fetchTechnicalReports = async () => {
  const response = await axiosClient.get("/technical-reports");
  return response.data;
};

const useGetTechnicalReports = (ids: string[]) => {
  const {
    data: technicalReports,
    isLoading,
    isError,
    error,
  } = useQuery("technicalReports", fetchTechnicalReports);

  const filteredReports = technicalReports
    ? technicalReports.filter((report: TechnicalReport) =>
        ids.includes(report.id)
      )
    : [];

  return {
    technicalReports: filteredReports,
    isLoading,
    isError,
    error,
  };
};

export default useGetTechnicalReports;
