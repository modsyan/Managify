import { Input, Option, Select } from "@mui/joy";
import { Button, Title } from "rizzui";

export const AddAsset = () => {
  return (
    <div className="flex flex-col gap-3">
      <Title as="h3" className="text-red-dark">
        إضافة أصل
      </Title>
      <form className="bg-gray-50 rounded-lg shadow-lg p-3 gap-3 flex flex-col grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <label>اختر المبنى</label>
          <Select name="facility">
            <Option value="facility1">مبنى 1</Option>
            <Option value="facility2">مبنى 2</Option>
            <Option value="facility3">مبنى 3</Option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label>اختر الطابق</label>
          <Select name="level">
            <Option value="level1">طابق 1</Option>
            <Option value="level2">طابق 2</Option>
            <Option value="level3">طابق 3</Option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label>اختر المنطقة</label>
          <Select name="area">
            <Option value="area1">منطقة 1</Option>
            <Option value="area2">منطقة 2</Option>
            <Option value="area3">منطقة 3</Option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label>اختر نوع الأصل</label>
          <Select name="asset-type">
            <Option value="asset-type1">نوع 1</Option>
            <Option value="asset-type2">نوع 2</Option>
            <Option value="asset-type3">نوع 3</Option>
          </Select>
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label htmlFor="assetName">اسم الأصل</label>
          <Input name="assetName" placeholder="اسم الأصل" id="assetName" />
        </div>
        <Button type="submit" className="font-cairo col-span-2">
          إضافة
        </Button>
      </form>
    </div>
  );
};
