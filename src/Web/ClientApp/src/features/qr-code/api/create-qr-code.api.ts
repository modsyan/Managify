import axiosClient from "../../../utils/axiosClient";

export const createQrCode = async (qrCode) => {
  const response = await axiosClient.post("/qr-codes", qrCode);
  return response.data;
};
