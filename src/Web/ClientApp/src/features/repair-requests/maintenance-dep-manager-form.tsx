import { Input, Textarea, Title } from "rizzui";
import * as dataJson from "../../data/lang.json";
import useFormContext from "../../hooks/useFormContext";
import { ChangeEvent } from "react";
export const MaintenanceDepManagerForm = () => {
  const { data, handleChange } = useFormContext();

  return (
    <form className="flex flex-col w-[50%]">
      <Title as="h5" className="col-span-5 mt-5 text-red-dark mb-6">
        بيانات مدير الصيانة{" "}
      </Title>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-6">
          <Input
            type="text"
            label={dataJson.ar.admin_name}
            placeholder="محمد أحمد"
            className="col-span-2"
            id="adminName"
            value={data.adminName}
            onChange={handleChange}
          />
          <Input
            type="date"
            label={dataJson.ar.date}
            className="col-span-2"
            id="adminDate"
            value={data.adminDate}
            onChange={handleChange}
          />
          <Textarea
            label={dataJson.ar.notes}
            placeholder={dataJson.ar.write_your_note_here}
            className=" resize-none col-span-2 "
            id="adminNotes"
            value={data.adminNotes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e)}
          />
        </div>
      </div>
    </form>
  );
};
