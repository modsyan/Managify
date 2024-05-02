import * as  React from "react";
import { Table } from "../../../components/elements";
import { MdDelete, MdEdit } from "react-icons/md";
import { EyeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useGetQrCodes } from "./hooks/use-get-qr-codes";
import { QrCode } from "../types";

export function QrCodesTable() {
  const { data, isLoading, isError } = useGetQrCodes();
  if (isLoading) return <div>Loading</div>;
  if (isError || !data) return <div>Error</div>;
  return (
    <div className="min-h-screen  flex flex-col  gap-3 ">
      <Table<QrCode>
        data={data}
        title="قائمة ال QR Codes"
        columns={[
          {
            field: "id",
            title: "رقم الطلب",
          },
          {
            field: "createdAt",
            title: "تاريخ الإنشاء",
          },
          {
            field: "level",
            title: "الطابق",
          },
          {
            field: "area",
            title: "المنطفة",
          },
          {
            field: "resourceAssetType",
            title: "نوع الموارد",
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
