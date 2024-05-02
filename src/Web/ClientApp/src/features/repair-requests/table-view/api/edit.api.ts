import axiosClient from "../../../../utils/axiosClient";

export const editRepairRequest = async (id: string, payload) => {
  // use axios to make a PUT request to the API
  // the URL should be /api/repair-requests/:id
  const data = axiosClient.put(`/api/repair-requests/${id}`, payload);
  // return the response
  return data;
};
