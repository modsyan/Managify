/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Title } from "rizzui";

export const Dashboard = () => {
  const repairRequestData = [
    { name: " لم يتم الإصلاح", value: 8 },
    { name: "تم الإصلاح", value: 4 },
    { name: "عدد طلبات الإصلاح", value: 12 },
  ];
  const technicalReportData = [
    { name: "عدد التقارير الفنية", value: 8 },
    { name: "عدد الفنيين المسؤولين", value: 3 },
  ];
  const assetsData = [
    { name: "عدد الأصول", value: 40 },
    { name: "عدد أنواع الأصول", value: 8 },
  ];
  return (
    <div className="flex flex-col gap-3">
      <Title as="h3" className="text-red-dark">
        لوحة التحكم
      </Title>
      <div className="grid grid-cols-2 gap-6">
        <div className="grid grid-cols-3 gap-4">
          <ChartCard
            title=" إحصائيات عن طلبات الإصلاح"
            data={repairRequestData}
          />
          {/* Add more ChartCards with different data */}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <ChartCard
            title=" إحصائيات عن التقارير الفنية"
            data={technicalReportData}
          />
          {/* Add more ChartCards with different data */}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <ChartCard title=" إحصائيات عن الأصول وأنواعها" data={assetsData} />
          {/* Add more ChartCards with different data */}
        </div>
      </div>
    </div>
  );
};

const ChartCard: React.FC<{ title: string; data: any[] }> = ({
  title,
  data,
}) => {
  return (
    <div className="bg-gray-50 flex flex-col gap-4 p-3 rounded-lg shadow-lg w-[500px] h-96">
      <Title as="h5">{title}</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} style={{}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickMargin={20} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
