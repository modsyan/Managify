import axiosClient from "../../../../utils/axiosClient";

export const getTechnicalReportById = (id) => {
  return axiosClient
    .get(`/repair-requests/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};
