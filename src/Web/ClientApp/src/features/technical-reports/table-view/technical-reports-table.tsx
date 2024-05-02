import * as React from "react";
import { Table } from "../../../components/elements";
import { MdDelete, MdEdit } from "react-icons/md";
import { EyeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useGetTechnicalReports } from "./hooks/use-get-technical-reports";
import { TechnicalReport } from "../types";

export function TechnicalReportsTable() {
  const { data, isLoading, isError } = useGetTechnicalReports();
  if (isLoading) return <div>Loading</div>;
  if (isError || !data) return <div>Error</div>;
  return (
    <div className="min-h-screen  flex flex-col  gap-3 ">
      <Table<TechnicalReport>
        data={data}
        title="قائمة التقارير الفنية"
        columns={[
          {
            field: "id",
            title: "رقم الطلب",
          },
          {
            field: "title",
            title: "عنوان التقرير",
          },
          {
            field: "technicianName",
            title: "اسم الفني",
          },

          {
            field: "createdAt",
            title: "تاريخ الإنشاء",
          },

          {
            title: "",
            field: "id",
            Cell({ entry: { id } }) {
              return (
                <Link to={`/repair-requests/${id}`}>
                  <EyeIcon id={id} className="text-gray-700" />
                </Link>
              );
            },
          },
          {
            title: "",
            field: "id",
            Cell({ entry: { id } }) {
              return <MdDelete id={id} className="text-red-dark" />;
            },
          },
          {
            title: "",
            field: "id",
            Cell({ entry: { id } }) {
              return <MdEdit id={id} className="text-blue-600" />;
            },
          },
        ]}
      ></Table>
    </div>
  );
}
