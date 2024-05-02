import { Title } from "rizzui";
import { LevelsTable } from "../features/levels/LevelsTable";

export const LevelsDetails = () => {
  return (
    <div className="min-h-screen  flex flex-col gap-3 w-full">
      <Title as="h3" className="text-red-dark">
        تفاصيل الطوابق
      </Title>
      <LevelsTable className="w-full " />
    </div>
  );
};
