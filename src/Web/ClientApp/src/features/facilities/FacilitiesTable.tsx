import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useFacilities } from "./useFacilities";
import TextField from "@mui/material/TextField";
import { ErrorPage } from "../../components/ui/ErrorPage";
import { Loading } from "../../components/ui/Loading";
type ResourceAsset = {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type ResourceAssetType = {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  resourceAssets: ResourceAsset[];
};

type Area = {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  resourceAssetTypes: ResourceAssetType[];
};

type Level = {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  areas: Area[];
};

type Facility = {
  id: number;
  uuid: string;
  name: string;
  levels: Level[];
  createdAt: string;
  updatedAt: string;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "رقم المبنى", width: 120 },
  { field: "name", headerName: "الاسم", width: 200 },
  {
    field: "numberOfLevels",
    headerName: "عدد الطوابق",
    type: "number",
    width: 200,
  },
  // {
  //   field: "adminName",
  //   headerName: "اسم المسؤول",
  //   type: "number",
  //   width: 200,
  // },
  { field: "createdAt", headerName: "تاريخ الإنشاء", width: 200 },
  { field: "updatedAt", headerName: "تاريخ التحديث", width: 200 },
];

export const FacilitiesTable: React.FC<{ className: string }> = ({
  className,
}) => {
  const { data, isError, isLoading } = useFacilities();
  console.log(data);
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const rows = data?.map((facility: Facility) => ({
    id: facility.id,
    name: facility.name,
    numberOfLevels: facility.levels.length,
    createdAt: facility.createdAt,
    updatedAt: facility.updatedAt,
  }));
  if (!rows) {
    return <ErrorPage />;
  }
  return (
    <div className={className}>
      <TextField
        label="ابحث عن مبنى بالاسم"
        value={data}
        style={{
          marginBottom: 16,
          width: "400px",
          marginTop: "40px",
          outline: "none",
          border: "none",
        }}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
