import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Checkbox, Input } from "rizzui";
import { TechnicalReport } from "../types/technical-report";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

interface ReportRowProps {
  reportData: TechnicalReport;
  selected: boolean;
  onChange: () => void;
}

function ReportRow({ reportData, selected, onChange }: ReportRowProps) {
  const { title, technicianName, createdAt } = reportData;

  return (
    <tr className="border text-right font-cairo">
      <td className="border px-4 py-2">
        <Checkbox checked={selected} onChange={onChange} />
      </td>
      <td className="border px-4 py-2">{createdAt.toLocaleString()}</td>
      <td className="border px-4 py-2">{title}</td>
      <td className="border px-4 py-2">{technicianName}</td>
      <td className="border px-4 py-2 text-red-dark underline">
        <Link to={`/technical-reports/${reportData.id}`}>عرض التفاصيل</Link>
      </td>
    </tr>
  );
}

export function ExportedTable() {
  const { data: reports } = useQuery<TechnicalReport[]>(
    "technicalReports",
    async () => {
      const response = await axiosClient.get<TechnicalReport[]>(
        "/technical-reports"
      );
      return response.data;
    }
  );

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<boolean[]>([]);

  useEffect(() => {
    setSelectedRows(new Array(reports?.length ?? 0).fill(false));
  }, [reports]);

  const filterReportsByDate = () => {
    return (
      reports?.filter((report) => {
        const reportDate = new Date(report.createdAt);
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
      }) ?? []
    );
  };

  const filteredReports = filterReportsByDate();

  const handleRowSelect = (index: number) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows(newSelectedRows);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredReports.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  return (
    <>
      <div className="bg-gray-50 p-3 flex flex-col gap-3 rounded-lg shadow-lg">
        <div className="flex gap-6">
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
              <th className="border px-4 py-2">عنوان التقرير</th>
              <th className="border px-4 py-2">اسم الفني</th>
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            السابق
          </Button>
          <span>{`صفحة ${currentPage} من ${totalPages}`}</span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            التالي
          </Button>
        </div>
      </div>
    </>
  );
}
