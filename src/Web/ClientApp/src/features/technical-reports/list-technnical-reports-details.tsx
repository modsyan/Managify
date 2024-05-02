import { Button, Title } from "rizzui";
import { TechnicalReportsTable } from "./table-view/technical-reports-table";
import { IoLocation } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ListTechnicalReportsDetails = () => {
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
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title as="h4" className="flex gap-2 items-center text-green">
            <IoLocation />
            <span>السفارة السعودية بالقاهرة</span>
          </Title>
          <Title as="h5">
            تصدير بتاريخ يوم {exportDate} في الساعة{" "}
            {new Date().toLocaleTimeString()}
          </Title>
        </div>
        <div>
          <Button onClick={handleExportClick}>تصدير</Button>
        </div>
      </div>
      <TechnicalReportsTable />
    </>
  );
};
