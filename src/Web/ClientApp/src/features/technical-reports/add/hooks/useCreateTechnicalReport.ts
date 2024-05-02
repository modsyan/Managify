import { useMutation } from "react-query";
import { createTechnicalReport } from "../api/create-technical-report.api";

export const useCreateTechnicalReport = () => {
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: createTechnicalReport,
  });
  return { data, isLoading, error, createTechnicalReport: mutate };
};
