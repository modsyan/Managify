import { Title } from "rizzui";
import { ResourceAssetTypesTable } from "../features/resource-asset-types/ResourceAssetTypesTable";

export const ResourceAssetTypesDetails = () => {
  return (
    <div className="min-h-screen  flex flex-col gap-3">
      <Title as="h3" className="text-red-dark">
        تفاصيل أنواع الأصول
      </Title>
      <div className="bg-gray-50 rounded-lg shadow-lg p-5 flex flex-col justify-center gap-4">
        <ResourceAssetTypesTable className="w-full " />
      </div>
    </div>
  );
};
