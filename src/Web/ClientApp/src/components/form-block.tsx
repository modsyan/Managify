import * as React from "react";
import { Title } from "rizzui";

export const FormBlock: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white mr-[280px] p-6 font-rubik m-[10px] rounded-md shadow-sm">
      <Title as="h5" className="col-span-5 mt-5 text-red-dark">
        {label}
      </Title>
      {children}
    </div>
  );
};
