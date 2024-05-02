import { Title } from "rizzui";
import { AddUserForm } from "./forms/add-user-form";

export const AddUser = () => {
  return (
    <div className="h-full flex flex-col gap-3">
      <Title as="h3" className="text-red-dark">
        إضافة مستخدم جديد
      </Title>
      <div className="p-4 rounded-lg shadow-lg flex flex-col gap-5 justify-center bg-gray-50 h-1/2 ml-6">
        <AddUserForm className="flex flex-col gap-5 w-1/2" />
      </div>
    </div>
  );
};
