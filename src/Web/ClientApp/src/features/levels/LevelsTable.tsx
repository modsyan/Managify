/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLevels } from "./useLevels";
import { ErrorPage } from "../../components/ui/ErrorPage";
import { Loading } from "../../components/ui/Loading";

type Area = {
  id: number;
  uuid: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

type Level = {
  id: number;
  uuid: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  areas: Area[];
  facility: Facility;
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
  { field: "id", headerName: "رقم الطابق", width: 80 },
  { field: "name", headerName: "اسم الطابق", width: 200 },
  { field: "facilityName", headerName: "اسم المبنى", width: 200 },
  {
    field: "numberOfAreas",
    headerName: "عدد المناطق",
    type: "number",
    width: 100,
  },
  { field: "createdAt", headerName: "تاريخ الإنشاء", width: 100 },
  { field: "updatedAt", headerName: "تاريخ التحديث", width: 100 },
];

export const LevelsTable: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { data, isError, isLoading } = useLevels();
  // const [filter, setFilter] = React.useState("");

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  console.log(data);

  const rows = data.flatMap((level: Level) =>
    level.areas.map((area: Area) => ({
      id: area.id,
      uuid: area.uuid,
      name: area.name,
      createdAt: area.createdAt,
      updatedAt: area.updatedAt,
      facilityName: level.facility.name,
      numberOfAreas: level.areas.length,
    }))
  );

  return (
    <div className={className}>
      {/* <TextField
        label="ابحث عن طابق بالاسم"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          marginBottom: 16,
          width: "400px",
          marginTop: "40px",
          outline: "none",
          border: "none",
        }}
      /> */}
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
