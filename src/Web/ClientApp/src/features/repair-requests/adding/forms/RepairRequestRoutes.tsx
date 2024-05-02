import { Route, Routes } from "react-router-dom";
import { ContractorDataForm } from "./ContractorDataForm/ContractorDataForm";
import { RequestDataForm } from "./RequestDataForm/RequestDataForm";

export const RepairRequestRoutes = () => {
  return (
    <Routes>
      <Route
        path="/repair-requests/create"
        element={
          <RequestDataForm
            onSuccess={() => {
              console.log("success");
            }}
          />
        }
      />
      <Route path="/contractor-data" element={<ContractorDataForm />} />
    </Routes>
  );
};
