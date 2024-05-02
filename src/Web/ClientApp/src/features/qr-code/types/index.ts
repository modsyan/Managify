import { Entity } from "../../../types/general";

export type QrCode = {
  facility: string;
  level: string;
  area: string;
  resourceAssetType: string;
} & Entity;
