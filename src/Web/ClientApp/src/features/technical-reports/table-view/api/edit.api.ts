import axiosClient from "../../../../utils/axiosClient";

export const editTechnicalReport = async (id: string, payload) => {
  const data = axiosClient.put(`/technical-reports/${id}`, payload);
  return data;
};
