import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Alert, Button, Dropdown, DropdownItem, Text, Title } from "rizzui";
import { useState } from "react";
import QRCode from "qrcode.react";
import { useQuery as useReactQuery } from "react-query";
import { Link } from "react-router-dom";
import { Level } from "../../types";
import axiosClient from "../../utils/axiosClient";
import { Loading } from "../../components/ui/Loading";
import { ErrorPage } from "../../components/ui/ErrorPage";
import cn from "../../utils/class-names";
import { FacilitiesClient } from "../../web-api-client";

type Facility = {
  id: string;
  name: string;
  levels: Level[];
};

export const AddQrCode = async () => {
  const facilitiesClient = new FacilitiesClient();

  // const {
  //   data: facilityData,
  //   isLoading,
  //   isError,
  // } = useReactQuery<Facility[]>("facilities", () => {
  //   return axiosClient.get("/facilities").then((res) => res.data);
  // });

  const { data: facilityVm, isLoading, isError } = await useReactQuery(
    "facility",
    async () => await facilitiesClient.getFacilities(1, 4)
  );

  const facilityData = facilityVm?.list;


  const [submitted, setSubmitted] = useState(false);
  const facilities = facilityDatat?.map((facility) => facility.name);
  const [facilityId, setFacilityId] = useState<string | null>(null);
  const [levelId, setLevelId] = useState<string | null>(null);
  const [areaId, setAreaId] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);

  const levels = facilityData
    ?.find((f) => f.id === facilityId)
    ?.levels?.map((l) => l.name);

  const areas: string[] =
    facilityData
      ?.find((f) => f.id === facilityId)
      ?.levels?.find((l) => l.id === levelId)
      ?.areas?.map((a) => a.name) || [];

  const handleFacilitySelect = (facility: string) => {
    const facilityId = facilityData?.find((f) => f.name === facility);
    setFacilityId(facilityId.id || null);
  };

  const handleLevelSelect = (level: string) => {
    const facility = facilityData?.find((f) => f.id === facilityId);
    const levelId = facility?.levels.find((l) => l.name === level)?.id;
    setLevelId(levelId ?? null);
  };
  const handleAreaSelect = (area: string) => {
    const facility = facilityData?.find((f) => f.id === facilityId);
    const level = facility?.levels.find((l) => l.id === levelId);
    const areaId = level?.areas.find((a) => a.name === area)?.id;
    console.log(areaId);

    setAreaId(areaId ?? null);
    setQrData(`localhost:5001/quick-repair-request/${areaId}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    <QRCode value={qrData || ""} />;
  };
  if (isLoading) {
    return <Loading />;
  }
  if (!isError) {
    return <ErrorPage />;
  }
  return (
    <div className="min-h-screen flex flex-col  gap-3">
      <Title as="h3" className="text-red-dark">
        إضافة QR Code
      </Title>
      <div className="flex flex-col bg-gray-50 shadow-lg justify-center gap-3 p-4 rounded-md">
        {submitted && (
          <Alert color="success" bar={true} className="">
            <Text className="font-bold text-2xl text-green mb-3">تم بنجاح</Text>
            <Text className="mb-2">تم حفظ البيانات بنجاح</Text>
            <Text>
              لتقديم طلب إصلاح{" "}
              <Link
                to={`localhost:5001/quick-repair-request/${areaId}`}
                className="font-bold text-blue"
              >
                اضغط هنا
              </Link>
            </Text>
          </Alert>
        )}

        <div className="flex flex-col-reverse justify-between items-center md:flex md:flex-row">
          <form
            className="w-[50%] flex flex-col gap-3 "
            onSubmit={handleSubmit}
          >
            <ItemsDropDown
              items={facilities || []}
              label="اختر المنشأة"
              onSelect={handleFacilitySelect}
            />
            <ItemsDropDown
              items={levels || []}
              label="اختر الطابق"
              onSelect={handleLevelSelect}
            />
            <ItemsDropDown
              items={areas || []}
              label="اختر المنطقة"
              onSelect={handleAreaSelect}
            />
            <div className="mt-6 rounded-md shadow-lg p-4 border-t-2 border-red">
              <span className="font-bold text-green">
                عند مسح الكود سيتم توجيهك إلى{" "}
                {`localhost:5001/quick-repair-request/${areaId}`}
              </span>
            </div>
            <Button className="mt-6" type="submit">
              إضافة
            </Button>
          </form>
          <div className="w-[50%] flex justify-center h-full items-center">
            {qrData ? (
              <div className="w-80 h-80 flex flex-col gap-6">
                <QRCode
                  value={qrData}
                  className="overflow-hidden ring-2 ring-black rounded-xl p-3"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg shadow-lg w-72 h-72">
                <p className="text-center mt-4">
                  ادخل البيانات لإظهار ال QR Code
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemsDropDown: React.FC<{
  items: string[];
  label: string;
  onSelect: (item: string) => void;
}> = ({ items, label, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
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
