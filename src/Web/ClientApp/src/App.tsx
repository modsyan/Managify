
import { AuthProvider } from "./context/authContext";
import { Login } from "./pages/login";
import AppLayout from "./layouts/AppLayout";
import { routes } from "./config/routes";
import { AddAssetCategory } from "./pages/add-asset-category";
import { AddAreaDetails } from "./pages/add-area-details";
import { AddLevelDetails } from "./pages/add-level-details";
import { AddBuildingDetails } from "./pages/add-building-details";
import TechnicalReportDetails from "./pages/technical-report-details";
import { QrCodeRepair } from "./pages/qr-code-repair";
import { QuickRepairRequestForm } from "./components/quick-repair-request-form";
import { EditRepairRequest } from "./pages/edit-repair-request";
import { LevelsDetails } from "./pages/levels-details";
import { FacilitiesDetails } from "./pages/facilities";
import { AddAsset } from "./pages/add-asset";
import { Dashboard } from "./pages/dashboard";
import { ResourceAssetTypesDetails } from "./pages/resourceAssetTypesDetails";
import { ExportedTechnicalReports } from "./pages/exported-technical-reports";
import { FormProvider } from "./features/repair-requests/adding/contexts/FormContext";
import { Review } from "./features/repair-requests/adding/forms/Review";
import { LangProvider } from "./context/langContext";
import { AddRepairRequest } from "./pages/add-repair-request";
import { FormProvider as FormProviderV1 } from "./context/form-context";
// import ProtectedRoute from "./components/ProtectedRoute";
import { RequestDataForm } from "./features/repair-requests/adding/forms/RequestDataForm/RequestDataForm";
import { ContractorDataForm } from "./features/repair-requests/adding/forms/ContractorDataForm/ContractorDataForm";
import { RepairRequestsTable } from "./features/repair-requests/table-view/repair-requests-table";
import { ListTechnicalReportsDetails } from "./features/technical-reports/list-technnical-reports-details";
import { AddTechnicalReportForm } from "./features/technical-reports/add/add-technical-report-form";
import { MaintenanceTabsDetails } from "./features/maintenance-management/maintenance-tabs-details";
import { CleaningTabsDetails } from "./features/cleaning-management/cleaning-tabs-details";
import { AddQrCode } from "./features/qr-code/add-qr-code";
import { QrCodesTable } from "./features/qr-code/table-view/qr-codes-table";
import { AddUser } from "./features/users/add-user";

import { StateMachineProvider } from "little-state-machine";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
export default function App() {
  return (
    <AuthProvider>
      <StateMachineProvider>
        <BrowserRouter>
          {/* <AppRoutes /> */}
          <LangProvider>
            <FormProvider>
              {/* <RepairRequestRoutes /> */}
              <Routes>
                <Route
                  element={
                    // <ProtectedRoute>
                    <AppLayout />
                    // </ProtectedRoute>
                  }
                >
                  {/* CREATE REPAIR REQUEST FORMS */}
                  <Route
                    path="/repair-requests/create"
                    element={
                      <RequestDataForm
                        onSuccess={() => {
                          console.log("data");
                        }}
                      />
                    }
                  />
                  <Route
                    path="/contractor-data"
                    element={<ContractorDataForm />}
                  />

                  {/* -------- */}
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route
                    path={routes.facilities.list}
                    element={<FacilitiesDetails />}
                  />
                  <Route
                    path={routes.levels.list}
                    element={<LevelsDetails />}
                  />
                  <Route
                    path="/preview"
                    element={
                      <PDFViewer className="min-h-screen w-full"></PDFViewer>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <>
                        <Dashboard />
                      </>
                    }
                  />

                  {/* Repair Requests Routes */}
                  {/* CREATE */}
                  <Route
                    path={routes.repairRequests.create}
                    element={
                      <FormProviderV1>
                        <AddRepairRequest />
                      </FormProviderV1>
                    }
                  />
                  {/* <Route
                  path="/contractor-data"
                  element={<ContractorDataForm />}
                /> */}
                  <Route path="/review" element={<Review />} />
                  {/* LIST TABLE */}
                  <Route
                    path={routes.repairRequests.list}
                    element={<RepairRequestsTable />}
                  />

                  {/* EDIT */}
                  <Route
                    path="/repair-requests/:id/edit"
                    element={<EditRepairRequest />}
                  />

                  {/* VIEW */}
                  <Route
                    path="/repair-requests/:id"
                    // element={<div>view</div>}
                  />
                  <Route
                    path="/quick-repair-request/:areaId"
                    element={<QuickRepairRequestForm />}
                  />

                  {/* Technical Reports Routes */}
                  <Route
                    path={routes.technicalReports.create}
                    element={<AddTechnicalReportForm />}
                  />
                  <Route
                    path={routes.technicalReports.list}
                    element={<ListTechnicalReportsDetails />}
                  />
                  <Route
                    path="/exported-technical-reports"
                    element={<ExportedTechnicalReports />}
                  />
                  <Route
                    path="/repair-requests/:id/edit"
                    // element={<div>edit</div>}
                  />
                  <Route
                    path="/maintenance"
                    element={<MaintenanceTabsDetails />}
                  />
                  <Route path="/cleaning" element={<CleaningTabsDetails />} />

                  <Route path="/qr-code/create" element={<AddQrCode />} />
                  <Route path="/qr-code" element={<QrCodesTable />} />
                  <Route
                    path="/qr-code/:id/repair"
                    element={<QrCodeRepair />}
                  />
                  {/* <Route path="/qr-code-repair" element={<QrCodeRepair />} /> */}
                  <Route
                    path="/technical-reports/:id"
                    element={<TechnicalReportDetails />}
                  />
                  <Route
                    path={routes.areas.create}
                    element={<AddBuildingDetails />}
                  />
                  <Route path={routes.users.create} element={<AddUser />} />
                  <Route
                    path={routes.levels.create}
                    element={<AddLevelDetails />}
                  />
                  <Route
                    path={routes.areas.create}
                    element={<AddAreaDetails />}
                  />
                  <Route
                    path={routes.assetCategories.create}
                    element={<AddAssetCategory />}
                  />
                  <Route
                    path={routes.resourceAssetTypes.list}
                    element={<ResourceAssetTypesDetails />}
                  />
                  <Route path={routes.assets.create} element={<AddAsset />} />
                </Route>
                <Route path="/login" element={<Login className="" />} />
              </Routes>
            </FormProvider>
          </LangProvider>
        </BrowserRouter>
      </StateMachineProvider>
    </AuthProvider>
  );
}
