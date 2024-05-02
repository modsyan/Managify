import { Button, Title } from "rizzui";
import { ExportedTable } from "../components/exported-table";
import { PiExportDuotone } from "react-icons/pi";
import { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const TechnicalReportsPreviewPDF = () => {
  const navigate = useNavigate();
  const handleExportClick = () => {
    navigate("/exported-technical-reports");
  };
  const [exportDate] = useState(() => {
    const arabicDate = new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",

      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date());
    return arabicDate;
  });

  return (
    <div className=" min-h-screen flex flex-col gap-6">
      {/* Export at Date.now() as a title */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <Title as="h3" className="text-red-dark">
            تصدير التقارير الفنية
          </Title>
          <Title as="h4" className="flex gap-2 items-center text-green">
            <IoLocation />
            <span>السفارة السعودية بالقاهرة</span>
          </Title>
          <Title as="h5">
            تصدير بتاريخ يوم {exportDate} في الساعة{" "}
            {new Date().toLocaleTimeString()}
          </Title>
        </div>
        <Button
          className="bg-red-dark w-20 p-3 flex gap-3 place-items-start"
          onClick={handleExportClick}
        >
          <PiExportDuotone />
          <span>تصدير</span>
        </Button>
      </div>

      <ExportedTable />
    </div>
  );
};
