export type TabPanelContent = Array<{
  options: { title: string; check: boolean }[];
}>;

export type TabPanel = {
  id: number;
  title: string;
  content: TabPanelContent;
};
