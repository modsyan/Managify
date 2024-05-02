import axiosClient from "../../../../utils/axiosClient";
import { TechnicalReport } from "../../types";

export const createTechnicalReport = async (
  technicalReport: TechnicalReport
) => {
  const response = await axiosClient.post<TechnicalReport>(
    "/technical-reports",
    technicalReport
  );
  return response.data;
};
