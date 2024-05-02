import axiosClient from "../../../../utils/axiosClient";

export const getRepairRequestById = (id) => {
  return axiosClient
    .get(`/repair-requests/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};
