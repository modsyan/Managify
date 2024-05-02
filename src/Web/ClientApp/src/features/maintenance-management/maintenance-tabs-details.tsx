import { useLocation } from "react-router-dom";
import * as React from "react";
import { Title } from "rizzui";
import { UserProvider } from "../../context/user-context";
import { MyTabs } from "../../components/elements/Tabs";

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
    tabName: "صيانة الدور الأول",
    options: [
      {
        title: "صيانة المكتب رقم ٣",
        check: false,
      },
      {
        title: "صيانة دورات المياة",
        check: false,
      },
      {
        title: "صيانة اي حاجة ",
        check: false,
      },
    ],
  },
  {
    id: 0,
    type: "yearly",
    tabName: "صيانة الدور الأول",
    options: [
      {
        title: "صيانة المكتب رقم ٣",
        check: false,
      },
      {
        title: "صيانة دورات المياة",
        check: false,
      },
      {
        title: "صيانة اي حاجة ",
        check: false,
      },
    ],
  },
  {
    id: 0,
    type: "monthly",
    tabName: "صيانة الدور الأول",
    options: [
      {
        title: "صيانة المكتب رقم ٣",
        check: false,
      },
      {
        title: "صيانة دورات المياة",
        check: false,
      },
      {
        title: "صيانة اي حاجة ",
        check: false,
      },
    ],
  },
  {
    id: 0,
    type: "quarterly",
    tabName: "صيانة الدور الأول",
    options: [
      {
        title: "صيانة المكتب رقم ٣",
        check: false,
      },
      {
        title: "صيانة دورات المياة",
        check: false,
      },
      {
        title: "صيانة اي حاجة ",
        check: false,
      },
    ],
  },
  {
    id: 0,
    type: "weekly",
    tabName: "صيانة الدور الأول",
    options: [
      {
        title: "صيانة المكتب رقم ٣",
        check: false,
      },
      {
        title: "صيانة دورات المياة",
        check: false,
      },
      {
        title: "صيانة اي حاجة ",
        check: false,
      },
    ],
  },
];
type MaintenanceType = "daily" | "monthly" | "yearly" | "quarterly" | "weekly";
function getMaintenanceOptions(type: MaintenanceType): TabType[] {
  return tabsData.filter((tab) => tab.type === type);
}

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
enum MAINENANCE_TITLE {
  DAILY = "الصيانة اليومية",
  MONTHLY = "الصيانة الشهرية",
  YEARLY = "الصيانة السنوية",
  QUARTERLY = "الصيانة الربع سنوية",
  WEEKLY = "الصيانة الأسبوعية",
}

export const MaintenanceTabsDetails = () => {
  const typeQuery = useQuery().get("type") as MaintenanceType;

  const data = getMaintenanceOptions(typeQuery);
  console.log("typeQuery", typeQuery);

  console.log(data);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Title as="h3" className="my-6 text-red-dark">
            {MAINENANCE_TITLE[typeQuery.toUpperCase()]}
          </Title>
        </div>
        {/* list tab names */}
        <UserProvider>
          <MyTabs tabsData={data} />
        </UserProvider>
      </div>
    </>
  );
};
