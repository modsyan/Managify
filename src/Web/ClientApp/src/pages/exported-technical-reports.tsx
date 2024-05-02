import { useQuery } from "react-query";
import axiosClient from "../utils/axiosClient";
import { TechnicalReportsTableAsPdf } from "../components/TechnicalReportsTableAsPDF";

export const ExportedTechnicalReports = () => {
  const { data } = useQuery("technicalReports", () =>
    axiosClient.get("/technical-reports").then((res) => res.data)
  );
  console.log("data", data);

  return (
    <TechnicalReportsTableAsPdf currentUsername="محمد حمدي" reports={data} />
  );
};
