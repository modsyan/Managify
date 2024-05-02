import { Button, Title } from "rizzui";
import TechnicalReportsTable from "../features/repair-requests/technical-reports-table";
import { PlusIcon } from "@heroicons/react/20/solid";
export const ListTechnicalReports = () => {
  return (
    <>
      <div className="flex  gap-6 flex-col h-screen  text-center ">
        <Title as="h4">قائمة التقارير الفنية</Title>
        <Button className="w-fit">
          <span>إضافة تقرير فني</span>{" "}
          <PlusIcon strokeWidth="2" className="h-4 w-4 ml-2" />
        </Button>
        <TechnicalReportsTable />
      </div>
    </>
  );
};
