import * as React from "react";
import { useState } from "react";
import { Button, Checkbox, Input, Title } from "rizzui";
interface ExportedReport {
  id: string;
  faultType: string;
  date: string;
  location: string;
}

interface ReportRowProps {
  reportData: ExportedReport;
  selected: boolean;
  onChange: () => void;
}

function ReportRow({ reportData, selected, onChange }: ReportRowProps) {
  const { id, location, date, faultType } = reportData;

  return (
    <tr className="border text-right font-cairo">
      <td className="border px-4 py-2">
        <Checkbox checked={selected} onChange={onChange} />
      </td>
      <td className="border px-4 py-2">{date}</td>
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">{faultType}</td>
      <td className="border px-4 py-2">{location}</td>
      <td className="border px-4 py-2 text-red-dark underline">
        <a href="#">اضغط هنا</a>
      </td>
    </tr>
  );
}

export function RepairRequestsTable() {
  const reports: ExportedReport[] = [
    {
      id: "1",
      faultType: "كهرباء",
      date: "2023-01-15",
      location: "مكتب السيد محمد",
    },
    {
      id: "2",
      faultType: "كهرباء",
      date: "2023-01-15",
      location: "مكتب السيد محمد",
    },
    {
      id: "3",
      faultType: "كهرباء",

      date: "2023-01-15",
      location: "مكتب السيد محمد",
    },
    {
      id: "4",
      faultType: "كهرباء",
      date: "2023-01-15",
      location: "مكتب السيد محمد",
    },
    {
      id: "5",
      faultType: "كهرباء",
      date: "2023-01-15",
      location: "مكتب السيد محمد",
    },
    {
      id: "6",
      faultType: "كهرباء",
      date: "2023-01-15",
      location: "مكتب السيد محمد",
    },
    {
      id: "7",
      faultType: "كهرباء",
      date: "2023-01-15",
      location: "مكتب السيد محمد",
    },
    // Add other report objects here...
  ];
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const filterReportsByDate = () => {
    // Assuming reports have a 'date' property in the format 'yyyy-mm-dd'
    return reports.filter((report) => {
      const reportDate = new Date(report.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return reportDate >= start && reportDate <= end;
      } else if (start) {
        return reportDate >= start;
      } else if (end) {
        return reportDate <= end;
      }
      return true;
    });
  };
  const filteredReports = filterReportsByDate();

  const [selectedRows, setSelectedRows] = useState<boolean[]>(
    new Array(reports.length).fill(false)
  );

  const handleRowSelect = (index: number) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows(newSelectedRows);
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Change this value as needed

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredReports.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  return (
    <div className="min-h-screen  flex flex-col  gap-3 ">
      <Title as="h3" className="text-red-dark">
        قائمة طلبات الإصلاح
      </Title>
      <div className="bg-gray-50 p-3 rounded-lg shadow-lg flex flex-col gap-3">
        <div className="flex gap-6 ">
          <div className="flex gap-2 items-center">
            <label htmlFor="startDate">من</label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="endDate">إلى</label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <table className="table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-right font-cairo">
              <th className="border px-4 py-2 w-12">تحديد</th>
              <th className="border px-4 py-2">التاريخ</th>
              <th className="border px-4 py-2">رقم التقرير</th>
              <th className="border px-4 py-2">نوع العطل</th>
              <th className="border px-4 py-2">العنوان</th>
              <th className="border px-4 py-2">عرض التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((reportData, index) => (
              <ReportRow
                key={index}
                reportData={reportData}
                selected={selectedRows[index]}
                onChange={() => handleRowSelect(index)}
              />
            ))}
          </tbody>
        </table>
        <div className="flex justify-evenly items-center">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            السابق
          </Button>
          <span>{`صفحة ${currentPage} من ${totalPages}`}</span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
}
