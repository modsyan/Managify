import axiosClient from "../../../../utils/axiosClient";

export const deleteTechnicalReport = async (id: string) => {
  // use axios to make a DELETE request to the API
  // the URL should be /api/repair-requests/:id
  const data = axiosClient.delete(`/api/technical-reports/${id}`);
  // return the response
  return data;
};
