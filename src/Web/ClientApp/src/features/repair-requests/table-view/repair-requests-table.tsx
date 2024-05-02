import React from "react";
import { useGetRepairRequests } from "./hooks/use-get-repair-requests";
import { Table } from "../../../components/elements";
import { MdDelete, MdEdit } from "react-icons/md";
import { RepairRequestFormDTO } from "../shared/types";
import { EyeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export function RepairRequestsTable() {
  const { data, isLoading, isError } = useGetRepairRequests();
  if (isLoading) return <div>Loading</div>;
  if (isError || !data) return <div>Error</div>;
  return (
    <div className="min-h-screen  flex flex-col  gap-3 ">
      <Table<RepairRequestFormDTO>
        data={data}
        title="قائمة طلبات الإصلاح"
        columns={[
          {
            field: "id",
            title: "رقم الطلب",
          },
          {
            field: "resourceAssetType",
            title: "نوع العطل",
          },
          {
            field: "area",
            title: "المنطقة",
          },
          {
            field: "createdAt",
            title: "تاريخ الإنشاء",
          },
          {
            field: "updatedAt",
            title: "تاريخ التعديل",
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
