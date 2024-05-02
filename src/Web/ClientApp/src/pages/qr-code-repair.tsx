import { useQuery } from "react-query";
import { Level } from "../types";
import axiosClient from "../utils/axiosClient";

export const QrCodeRepair = () => {
  // get qr code from the api localhost:5001/qr-codes/:id using react query and axios
  const { data: qrCodeData } = useQuery<Level[]>("levels", () => {
    return axiosClient.get("/levels").then((res) => {
      return res.data;
    });
  });
  // display the qr code
  // display the form
  // submit the form
  // send the data to the api localhost:5001/repair-requests
  // redirect to the repair requests list page

  return <div>lol</div>;
};
