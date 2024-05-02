import axiosClient from "../../../../../../utils/axiosClient";

export const getFacilities = async () => {
  const response = await axiosClient.get("/facilities", {
    timeout: 10000,
  });
  return response.data;
};
