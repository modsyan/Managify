import axiosClient from "../../../../../../utils/axiosClient";

/**
 * The function makes a HTTP Request using axios to get a list of areas
 * @param levelId
 * @returns list of areas for a given level
 */
export async function getAreas(levelId: string) {
  const response = await axiosClient.get(`/areas/?levelId=${levelId}`);
  return response.data;
}
