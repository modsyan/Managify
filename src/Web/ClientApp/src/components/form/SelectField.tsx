/* eslint-disable @typescript-eslint/no-explicit-any */
import * as clsx from "clsx";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import { Option, Select } from "@mui/joy";
type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
  name: string;
};

export const SelectField = (props: SelectFieldProps) => {
  const { label, options, error, className, defaultValue, registration, name } =
    props;

  return (
    <FieldWrapper label={label} error={error}>
      <Select
        name={name}
        className={clsx(
          "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-gray-500 focus:border-blue-500 sm:text-sm rounded-md",
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options?.map(({ label, value }) => (
          <Option key={label.toString()} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </FieldWrapper>
  );
};
