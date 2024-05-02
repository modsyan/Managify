import axiosClient from "../../../../utils/axiosClient";

export const getAllRepairRequests = () => {
  return axiosClient
    .get("/technical-reports")
    .then((res) => res.data)
    .catch((err) => err);
};
