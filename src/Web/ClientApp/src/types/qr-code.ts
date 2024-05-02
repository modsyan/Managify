export type resourceAsset = {
  id: string;
  name: string;
};
export type resourceAssetType = {
  id: string;
  name: string;
  resourceAssets: resourceAsset[];
};

export type Area = {
  id: string;
  name: string;
  resourceAssetTypes: resourceAssetType[];
};
export type Level = {
  id: string;
  name: string;
  areas: Area[];
};
export type Facility = {
  id: string;
  name: string;
  levels: Level[];
};
