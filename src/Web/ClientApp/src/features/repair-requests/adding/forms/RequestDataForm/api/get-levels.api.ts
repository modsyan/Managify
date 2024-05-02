import axiosClient from "../../../../../../utils/axiosClient";

/**
 * The function makes a HTTP Request using axios to get a list of levels
 * @param facilityId
 * @returns list of levels for a given facility
 */
export async function getLevels(facilityId: string) {
  const response = await axiosClient.get(`/levels?facilityId=${facilityId}`);
  return response.data;
}
