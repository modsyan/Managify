import { Input, Textarea, Title } from "rizzui";
import * as dataJson from "../../data/lang.json";
import useFormContext from "../../hooks/useFormContext";

export const FaultDetailsForm: React.FC = () => {
  const { handleChange, data } = useFormContext();
  console.log(data);

  // data.attendsAt = selectedTime;
  // data.attendsOn = selectedDate;

  return (
    <form className="bg-gray-50 p-3 rounded-md shadow-md gap-6 mt-4 w-full ring-[1px] ring-gray-300">
      <div className="flex flex-col w-full gap-10">
        <Title as="h5" className="col-span-5 mt-5 text-red-dark">
          تفاصيل العطل
        </Title>

        <div className="grid grid-cols-2 w-full gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-start gap-6">
              <Input
                label={dataJson.ar.suitable_date_to_attend}
                type="date"
                className="col-span-3"
                onChange={handleChange}
                id="attendsOn"
                value={data.attendsOn}
              />
              <Input
                label={dataJson.ar.hour}
                type="time"
                className="col-span-3"
                onChange={handleChange}
                id="attendsAt"
                value={data.attendsAt}
              />
            </div>
          </div>
          <div>
            <Textarea
              label={dataJson.ar.fault_description}
              placeholder={dataJson.ar.describe_the_fault}
              className="col-span-3 resize-none"
              onChange={handleChange}
              id="faultDescription"
              value={data.faultDescription}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
