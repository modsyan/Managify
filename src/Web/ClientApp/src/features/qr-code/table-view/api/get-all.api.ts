import axiosClient from "../../../../utils/axiosClient";
import { QrCode } from "../../types";

export const getQrCodesData = async () => {
  const response = await axiosClient.get<QrCode[]>("/qr-codes");
  return response.data;
};
