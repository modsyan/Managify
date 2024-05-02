type TabType = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

type Option = {
  title: string;
  check: boolean;
};

export type Tab = {
  id: number;
  type: TabType;
  tabName: string;
  options: Option[];
};
