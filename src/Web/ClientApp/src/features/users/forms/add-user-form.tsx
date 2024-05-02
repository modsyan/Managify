/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Dropdown, DropdownItem, Input, Password } from "rizzui";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import cn from "../../../utils/class-names";

export const AddUserForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const roles = ["مدير", "مشرف", "مستخدم", "تقني"];
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    password: "", // Corrected the key to lowercase
  });

  const mutation = useMutation((data) =>
    axios.post("/api/v1/auth/register", data)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData as any);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleRoleSelect = (role: string) => {
    setFormData({ ...formData, role });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value }); // Corrected the key to lowercase
  };

  return (
    <form className={cn(className)} onSubmit={handleSubmit}>
      <Input label="الاسم" onChange={handleNameChange} />
      <Password label="كلمة السر" onChange={handlePasswordChange} />
      <ItemsDropDown items={roles} label="الدور" onSelect={handleRoleSelect} />
      <Button type="submit">
        <span>إضافة</span>
      </Button>
    </form>
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
      <label className="rizzui-input-label block text-sm mb-1.5" id={label}>
        {label}
      </label>
      <Dropdown
        trigger={
          <Button variant="outline" className="w-full" aria-labelledby={label}>
            {selectedItem || "اختر من هنا"}{" "}
            <ChevronDownIcon className="ml-2 w-5" />
          </Button>
        }
        className={"self-end"}
        dropdownClassName="w-48 mt-4"
      >
        <div className="flex gap-3 items-center flex-col">
          {items.map((item) => (
            <div
              onClick={() => handleItemClick(item)}
              key={item}
              className="w-full"
            >
              <DropdownItem
                className="px-5 py-2"
                activeClassName="bg-gray-100"
                key={item}
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
