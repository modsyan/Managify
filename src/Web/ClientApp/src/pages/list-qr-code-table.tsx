import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Button, Checkbox, Input, Title } from "rizzui";
import * as React from "react";

interface QrCodeProps {
  id: string;
  area: string;
  level: string;
  date: string;
}

interface QrCodeRowProps {
  qrData: QrCodeProps;
  selected: boolean;
  onChange: () => void;
}

function QrCodeRow({ qrData, selected, onChange }: QrCodeRowProps) {
  const { id, area, level, date } = qrData;

  return (
    <tr className="border text-right font-cairo">
      <td className="border px-4 py-2">
        <Checkbox checked={selected} onChange={onChange} />
      </td>
      <td className="border px-4 py-2">{date}</td>
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">{level}</td>
      <td className="border px-4 py-2">{area}</td>
      <td className="border px-4 py-2 text-red-dark underline">
        <a href="#">اضغط هنا</a>
      </td>
    </tr>
  );
}

export function ViewQrCode() {
  const { data: qrCodes } = useQuery<QrCodeProps[]>("qr-codes", () => {
    return axios.get("http://localhost:5001/qrCodes").then((res) => {
      return res.data;
    });
  });

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filterQrCodesByDate = () => {
    return qrCodes?.filter((qrCode) => {
      const qrCodeDate = new Date(qrCode.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return qrCodeDate >= start && qrCodeDate <= end;
      } else if (start) {
        return qrCodeDate >= start;
      } else if (end) {
        return qrCodeDate <= end;
      }
      return true;
    });
  };

  const filteredQrCodes = filterQrCodesByDate();

  const [selectedRows, setSelectedRows] = useState<boolean[]>(
    new Array(qrCodes?.length || 0).fill(false)
  );

  const handleRowSelect = (index: number) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows(newSelectedRows);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil((filteredQrCodes?.length || 0) / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredQrCodes?.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="h-full flex flex-col gap-5">
      <Title as="h3" className="text-red-dark">
        جدول ال QR Codes المتاحة
      </Title>
      <div className="bg-gray-50 flex flex-col  justify-center gap-6 p-6 rounded-lg shadow-lg">
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
              <th className="border px-4 py-2">رقم QR Code</th>
              <th className="border px-4 py-2">نوع العطل</th>
              <th className="border px-4 py-2">العنوان</th>
              <th className="border px-4 py-2">عرض التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((qrData, index) => (
              <QrCodeRow
                key={index}
                qrData={qrData}
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
