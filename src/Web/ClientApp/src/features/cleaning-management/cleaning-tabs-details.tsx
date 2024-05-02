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

function getCleaningTabsData(type: CleaningType): TabType[] {
  return tabsData.filter((tab) => tab.type === type);
}

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
enum CLEANING_TITLE {
  DAILY = "التنظيف اليومي",
  MONTHLY = "التنظيف الشهري",
  YEARLY = "التنظيف السنوي",
  QUARTERLY = "التنظيف الربع سنوي",
  WEEKLY = "التنظيف الأسبوعي",
}

export const CleaningTabsDetails = () => {
  const typeQuery = useQuery().get("type") as CleaningType;

  const data = getCleaningTabsData(typeQuery);
  console.log("typeQuery", typeQuery);

  console.log(data);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Title as="h3" className="my-6 text-red-dark">
            {CLEANING_TITLE[typeQuery.toUpperCase()]}
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
