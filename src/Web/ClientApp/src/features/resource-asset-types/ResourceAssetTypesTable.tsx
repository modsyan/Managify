import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useResourceAssetTypes } from "./useResourceAssetTypes";
import { Loading } from "../../components/ui/Loading";
import { ErrorPage } from "../../components/ui/ErrorPage";

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
  area: Area;
  resourceAssets: ResourceAsset[];
};

type Area = {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "المعرف", width: 40 },
  { field: "name", headerName: "الاسم", width: 100 },
  { field: "resourceAsset", headerName: "اسم الأصل", width: 100 },
  {
    field: "numberOfResourceAssets",
    headerName: "عدد الأصول",
    type: "number",
    width: 100,
  },
  {
    field: "areaName",
    headerName: "اسم المنطقة",
    type: "string",
    width: 100,
  },
  { field: "createdAt", headerName: "تاريخ الإنشاء", width: 120 },
  { field: "updatedAt", headerName: "تاريخ التحديث", width: 120 },
];

export const ResourceAssetTypesTable: React.FC<{ className: string }> = ({
  className,
}) => {
  const { data, isError, isLoading } = useResourceAssetTypes();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const rows = data?.flatMap((resourceAssetType: ResourceAssetType) =>
    (resourceAssetType?.resourceAssets || []).map(
      (resourceAsset: ResourceAsset) => ({
        id: resourceAssetType?.id || 0, // Added default value 0 for id
        name: resourceAssetType?.name || "",
        numberOfResourceAssets: (resourceAssetType?.resourceAssets || [])
          .length,
        resourceAsset: resourceAsset?.name || "",
        areaName: resourceAssetType?.area?.name || "",
        createdAt: resourceAsset?.createdAt || "",
        updatedAt: resourceAsset?.updatedAt || "",
      })
    )
  );
  if (!rows) {
    return <ErrorPage />;
  }
  return (
    <div className={className}>
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
