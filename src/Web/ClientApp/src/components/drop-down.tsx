/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState } from "react";
import { Button, Dropdown, DropdownItem } from "rizzui";
import cn from "../utils/class-names";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FormState, UseFormRegister, FieldValues } from "react-hook-form";

interface DropDownProps {
  id?: string;
  items: string[];
  label: string;
  selected?: string;
  context?: any;
  formState: FormState<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

export const DropDown: React.FC<DropDownProps> = ({
  items,
  label,
  selected,
  id,
  context,
  formState,
  register,
}) => {
  const { formData, updateFormData } = context;
  const [selectedItem, setSelectedItem] = useState<string>(selected || "");
  console.log(formData);

  const handleItemClick = (item: string) => {
    // Remove the error message when the user selects an item
    formState.errors[id] &&
      formState.errors[id].message &&
      formState.errors[id].message.toString();
    setSelectedItem(item);
    updateFormData({ ...formData, [id]: item });
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
        className="self-end"
        dropdownClassName="w-full mt-4"
      >
        <div className="" {...register(id, { required: "هذا الحقل مطلوب" })}>
          {items.map((item, index) => (
            <div key={index} onClick={() => handleItemClick(item)}>
              <DropdownItem
                className="px-5 py-2"
                activeClassName="bg-gray-100"
                children={({ active }) => (
                  <span
                    className={cn("text-gray-600", active && "!text-gray-900")}
                  >
                    {item}
                  </span>
                )}
              />
            </div>
          ))}
        </div>
      </Dropdown>
      {/* Display validation error */}
      {formState.errors[id] && (
        <span style={{ color: "red" }}>
          {formState.errors[id].message.toString()}
        </span>
      )}
    </div>
  );
};
