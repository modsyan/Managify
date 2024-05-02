import { Button, Dropdown, DropdownItem, Input, Title } from "rizzui";
import * as dataJson from "../../data/lang.json";
import useFormContext from "../../hooks/useFormContext";
import { useQuery } from "react-query";
import { Facility } from "../../types"; // Import types as needed
import axiosClient from "../../utils/axiosClient";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import cn from "../../utils/class-names";

export const RepairingRequestForm = () => {
  const { handleChange, data } = useFormContext();

  // Fetch facility data from the API using React Query
  const { data: facilityData } = useQuery<Facility[]>("facilities", () => {
    return axiosClient.get("/facilities").then((res) => res.data);
  });

  // Log context and facility data
  console.log("context data", data);
  console.log("facility data", facilityData);

  // Extract facility names
  const facilities = facilityData?.map((facility) => facility.name);

  // Extract levels from facility data
  const levels = facilityData?.flatMap((facility) => facility.levels || []);
  const levelsNames = levels?.map((level) => level.name);
  // Extract areas names from levels
  const areas = levels?.flatMap((level) => level.areas || []);
  const areasNames = areas?.map((area) => area.name) as string[];

  // Extract resource asset types from areas
  const resourceAssetTypes = areas?.flatMap(
    (area) => area.resourceAssetTypes || []
  );
  const resourceAssetTypesNames = resourceAssetTypes?.map(
    (resourceAssetType) => resourceAssetType.name
  ) as string[];

  // Extract asset types from resource asset types
  const assetTypes = resourceAssetTypes?.flatMap(
    (resourceAssetType) => resourceAssetType.resourceAssets || []
  );
  const assetTypesNames = assetTypes?.map(
    (assetType) => assetType.name
  ) as string[];
  console.log(``);

  return (
    <>
      <Title
        as="h5"
        className="col-span-full mt-5 text-red-dark text-right mx-3"
      >
        بيانات الطلب
      </Title>
      <form className="grid grid-cols-1 xl:grid-cols-2 bg-gray-50 p-6 rounded-md shadow-lg gap-3 my-3 ring-[1px] ring-gray-300 m-3">
        {/* First Col */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
          {/* validate input is required */}
          <Input
            type="date"
            label={dataJson.ar.reporting_date}
            onChange={handleChange}
            id="reportingDate"
            value={data.reportingDate}
          />
          <ItemsDropDown items={facilities || []} label="المبنى" />
          <ItemsDropDown items={levelsNames || []} label="الطابق" />
        </div>

        {/* Second Col */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
          <ItemsDropDown items={areasNames || []} label="المنطقة" />
          <ItemsDropDown
            items={resourceAssetTypesNames || []}
            label="نوع الأصل"
          />
          <ItemsDropDown items={assetTypesNames || []} label="الأصل" />
          {/* Add more dropdowns as needed */}
        </div>
      </form>
    </>
  );
};
const ItemsDropDown: React.FC<{
  items: string[];
  label: string;
}> = ({ items, label }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <label
        className="rizzui-input-label block text-sm mb-1.5"
        htmlFor={label}
      >
        {label}
      </label>
      <Dropdown
        trigger={
          <Button variant="outline" className="w-full">
            {selectedItem || "اختر من هنا"}{" "}
            <ChevronDownIcon className="ml-2 w-5" />
          </Button>
        }
        className={"self-end"}
        dropdownClassName="w-48 mt-4"
      >
        <div className="flex gap-3 items-center flex-col">
          {items.map((item, index) => (
            <div
              onClick={() => handleItemClick(item)}
              key={index}
              className="w-full"
            >
              <DropdownItem
                className="px-5 py-2"
                activeClassName="bg-gray-100"
                key={index}
              >
                {({ active }) => (
                  <span
                    className={cn("text-gray-600", active && "!text-gray-900")}
                  >
                    {item}
                  </span>
                )}
              </DropdownItem>
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};
