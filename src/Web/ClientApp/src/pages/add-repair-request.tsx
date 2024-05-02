import { Button, Title } from "rizzui";
import { CircularProgress } from "@mui/joy";
import { motion, AnimatePresence } from "framer-motion";
import useFormContext from "../hooks/useFormContext";
import { RepairingRequestForm } from "../features/repair-requests";
import { FaultDetailsForm } from "../features/repair-requests/fault-details-form";
import { TwoFormsHorizontal } from "../layouts/TwoFormsHorizontal";
import { EmployeeForm } from "../features/repair-requests/employee-form-details";
import { MaintenanceDepManagerForm } from "../features/repair-requests/maintenance-dep-manager-form";
import { AddAttachment } from "../features/repair-requests/add-attachment";
import { RepairRequest } from "../types/repair-request-form";
import { useEffect } from "react";
export const AddRepairRequest: React.FC<{
  repairRequest?: RepairRequest;
}> = ({ repairRequest }) => {
  console.log("Lol ");

  const {
    requestDataFilled,
    page,
    setPage,
    faultDataFilled,
    contractorDataFilled,
    employeeDataFilled,
    managerDataFilled,
    data,
    setData,
  } = useFormContext();
  console.log(data);

  useEffect(() => {
    if (repairRequest) {
      setData(repairRequest);
    }
  }, [repairRequest, setData]);

  const disablePrev = () => page === 1;

  const disableNext = () => {
    if (page === 1) return !requestDataFilled;
    if (page === 2) return !faultDataFilled;
    if (page === 3) return !contractorDataFilled;
    if (page === 4) return !employeeDataFilled || !managerDataFilled;

    return false;
  };
  const handleSubmit = () => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col font-cairo  min-h-screen ">
        {/* Title */}
        <div className="flex gap-4 items-center">
          <Title className="col-span-5 my-7">{"طلب إصلاح"}</Title>
          <CircularProgress
            size="md"
            determinate
            value={22}
            sx={{
              backgroundColor: "",
              color: "black",
              border: "none",
            }}
          ></CircularProgress>
        </div>
        {/* Forms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            onSubmit={() => {
              console.log("submitted");
            }}
          >
            {page === 1 && <RepairingRequestForm />}
            {page === 2 && <FaultDetailsForm />}
            {/* {page === 3 && <ContractorForm />} */}
            {page === 4 && (
              <TwoFormsHorizontal>
                <EmployeeForm />
                <MaintenanceDepManagerForm />
              </TwoFormsHorizontal>
            )}
            {page === 5 && <AddAttachment />}
          </motion.div>
        </AnimatePresence>
        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-end my-4">
          <Button
            disabled={disablePrev()}
            onClick={() => setPage((page) => page - 1)}
            className="bg-blue"
          >
            رجوع
          </Button>
          {page !== 5 && (
            <Button
              disabled={disableNext()}
              onClick={() => setPage((page) => page + 1)}
            >
              {"التالي"}
            </Button>
          )}
          {page === 5 && <Button type="submit">{"ارسال"}</Button>}
        </div>
      </div>
    </form>
  );
};
