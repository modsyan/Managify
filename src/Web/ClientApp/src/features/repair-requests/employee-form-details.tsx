import { Input, Radio, Textarea, Title } from "rizzui";
import * as dataJson from "../../data/lang.json";
import useFormContext from "../../hooks/useFormContext";

export const EmployeeForm: React.FC = () => {
  const { data, handleChange } = useFormContext();
  return (
    <form className="flex flex-col w-[50%] ml-5">
      <Title as="h5" className="col-span-5 mt-5 text-red-dark mb-6">
        بيانات الموظف
      </Title>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-6">
          <Input
            type="text"
            label={dataJson.ar.employee_name}
            placeholder="محمد أحمد"
            className="col-span-2"
            id="employeeName"
            value={data.employeeName}
            onChange={handleChange}
          />

          <Input
            type="date"
            label={dataJson.ar.date}
            className="col-span-2"
            id="employeeDate"
            value={data.employeeDate}
            onChange={handleChange}
          />
          <Textarea
            label={dataJson.ar.notes}
            placeholder={dataJson.ar.write_your_note_here}
            className=" resize-none col-span-2"
            id="employeeNotes"
            value={data.employeeNotes}
            onChange={handleChange}
          />
          <Radio
            label={"تم الاصلاح بشكل مرضي"}
            onChange={handleChange}
            id="employeeSatisfiedFixing"
            value={data.employeeSatisfiedFixing === true ? "true" : "false"}
          />
        </div>
      </div>
    </form>
  );
};
