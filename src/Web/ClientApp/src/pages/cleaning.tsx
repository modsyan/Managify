import { useLocation } from "react-router-dom";
import * as React from "react";
import { Button, Title } from "rizzui";
import { MyTabs } from "./tabs";

type Option = {
  title: string;
  check: boolean;
};

export type TabType = {
  id: number;
  type: "daily" | "monthly" | "yearly" | "quarterly" | "weekly";
  tabName: string;
  options: Option[];
};

const tabsData: TabType[] = [
  {
    id: 0,
    type: "daily",
    tabName: "نظافة الدور الأول",
    options: [
      {
        title: "نظافة المكتب رقم ٣",
        check: false,
      },
      {
        title: "نظافة دورات المياة",
        check: false,
      },
      {
        title: "نظافة اي حاجة ",
        check: false,
      },
    ],
  },
  {
    id: 0,
    type: "yearly",
    tabName: "نظافة الدور الأول",
    options: [
      {
        title: "نظافة المكتب رقم ٣",
        check: false,
      },
      {
        title: "نظافة دورات المياة",
        check: false,
      },
      {
        title: "نظافة اي حاجة ",
        check: false,
      },
    ],
  },
  {
    id: 0,
    type: "monthly",
    tabName: "نظافة الدور الأول",
    options: [
      {
        title: "نظافة المكتب رقم ٣",
        check: false,
      },
      {
        title: "نظافة دورات المياة",
        check: false,
      },
      {
        title: "نظافة اي حاجة ",
        check: false,
      },
    ],
  },
  {
    id: 0,
    type: "quarterly",
    tabName: "نظافة الدور الأول",
    options: [
      {
        title: "نظافة المكتب رقم ٣",
        check: false,
      },
      {
        title: "نظافة دورات المياة",
        check: false,
      },
      {
        title: "نظافة اي حاجة ",
        check: false,
      },
    ],
  },
  {
    id: 0,
    type: "weekly",
    tabName: "نظافة الدور الأول",
    options: [
      {
        title: "نظافة المكتب رقم ٣",
        check: false,
      },
      {
        title: "نظافة دورات المياة",
        check: false,
      },
      {
        title: "نظافة اي حاجة ",
        check: false,
      },
    ],
  },
];
type CleaningType = "daily" | "monthly" | "yearly" | "quarterly" | "weekly";
function getMaintenanceOptions(type: CleaningType): TabType[] {
  console.log(tabsData);

  return tabsData.filter((tab) => tab.type === type);
}

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
enum CLEANING_TITLE {
  DAILY = "النظافة اليومية",
  MONTHLY = "النظافة الشهرية",
  YEARLY = "النظافة السنوية",
  QUARTERLY = "النظافة الربع سنوية",
  WEEKLY = "النظافة الأسبوعية",
}
export const Cleaning = () => {
  const typeQuery = useQuery().get("type") as CleaningType;

  const data = getMaintenanceOptions(typeQuery);
  console.log(data);

  const [showTable, setShowTable] = React.useState(false);
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-red-dark">
          <Title as="h4" className="my-6">
            {CLEANING_TITLE[typeQuery.toUpperCase()]}
          </Title>
          <Button className="bg-red-dark" onClick={() => setShowTable(true)}>
            <span>عرض تقرير النظافة</span>
          </Button>
        </div>
        {/* list tab names */}
        <MyTabs tabsData={data} />
      </div>
    </>
  );
};
