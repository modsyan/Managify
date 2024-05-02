import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

interface Report {
  id: string | number;
  title: string;
  technicalName: string;
  date: string;
  notificationDate: string;
  location: string;
}

interface ReportRowProps {
  reportData: Report;
}

function ReportRow({ reportData }: ReportRowProps) {
  // onclick log the id of the report
  const navigate = useNavigate();
  const handleReportClick = () => {
    navigate(`/technical-reports/${reportData.id}/edit`);
    console.log(reportData.id);
  };
  const { title, technicalName, date, notificationDate, location, id } =
    reportData;
  return (
    <tr className="border text-right font-cairo">
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">{title}</td>
      <td className="border px-4 py-2">{technicalName}</td>
      <td className="border px-4 py-2">{date}</td>
      <td className="border px-4 py-2">{notificationDate}</td>
      <td className="border px-4 py-2 ">{location}</td>
      <td className="w-20">
        <div className="flex p-2 gap-2">
          <EyeIcon className="text-blue  cursor-pointer" />
          <PencilIcon
            className="text-green-dark  cursor-pointer"
            onClick={handleReportClick}
          />
          <TrashIcon className="text-red-dark cursor-pointer" />
        </div>
      </td>
    </tr>
  );
}

function TechnicalReportsTable() {
  const reports: Report[] = [
    {
      id: 1,
      title: "إصلاح عطل كهرباء",
      technicalName: "محمد أحمد",
      date: "2023-01-15",
      notificationDate: "2023-01-20",
      location: "السفارة السعودية في القاهرة",
    },
    {
      id: 2,
      title: "إصلاح عطل كهرباء",
      technicalName: "محمد أحمد",
      date: "2023-01-15",
      notificationDate: "2023-01-20",
      location: "السفارة السعودية في القاهرة",
    },
    {
      id: 3,
      title: "إصلاح عطل كهرباء",
      technicalName: "محمد أحمد",
      date: "2023-01-15",
      notificationDate: "2023-01-20",
      location: "السفارة السعودية في القاهرة",
    },
    {
      id: 4,

      title: "إصلاح عطل كهرباء",
      technicalName: "محمد أحمد",
      date: "2023-01-15",
      notificationDate: "2023-01-20",
      location: "السفارة السعودية في القاهرة",
    },
    {
      id: 5,
      title: "إصلاح عطل كهرباء",
      technicalName: "محمد أحمد",
      date: "2023-01-15",
      notificationDate: "2023-01-20",
      location: "السفارة السعودية في القاهرة",
    },
    {
      id: 6,
      title: "إصلاح عطل كهرباء",
      technicalName: "محمد أحمد",
      date: "2023-01-15",
      notificationDate: "2023-01-20",
      location: "السفارة السعودية في القاهرة",
    },
    {
      id: 7,
      title: "إصلاح عطل كهرباء",
      technicalName: "محمد أحمد",
      date: "2023-01-15",
      notificationDate: "2023-01-20",
      location: "السفارة السعودية في القاهرة",
    },
  ];

  return (
    <table className="table-auto border-collapse border">
      <thead>
        <tr className="bg-gray-100 text-right font-cairo">
          <th className="border px-4 py-2">رقم التقرير</th>
          <th className="border px-4 py-2">عنوان التقرير</th>
          <th className="border px-4 py-2">اسم الفني</th>
          <th className="border px-4 py-2">التاريخ</th>
          <th className="border px-4 py-2">تاريخ التنبيه</th>
          <th className="border px-4 py-2">الموقع</th>
          <th className="border px-4 py-2">أخرى</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((reportData, index) => (
          <ReportRow key={index} reportData={reportData} />
        ))}
      </tbody>
    </table>
  );
}

export default TechnicalReportsTable;
