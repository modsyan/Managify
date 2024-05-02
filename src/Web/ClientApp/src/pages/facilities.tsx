import { Title } from "rizzui";
import { FacilitiesTable } from "../features/facilities/FacilitiesTable";

export const FacilitiesDetails = () => {
  return (
    <div className="min-h-screen  flex flex-col ">
      <Title as="h3" className="text-red-dark">
        تفاصيل المباني
      </Title>
      <FacilitiesTable className="" />
    </div>
  );
};
