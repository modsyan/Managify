import axiosClient from "../../../utils/axiosClient";
import { Tab } from "../types";

export const getTabsData = async () => {
  const response = await axiosClient.get<Tab[]>("/maintenance");
  return response.data;
};
