import { Select } from "@windmill/react-ui";
import React from "react";

//internal import
import { timeZones } from "utils/timezones";

const SelectTimeZone = ({ register, name, label, required }) => {
  return (
    <Select
      className={`border text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white h-12`}
      name={name}
      {...register(`${name}`, {
        required: required ? false : `${label} is required!`,
      })}
    >
      <option value="" defaultValue hidden>
        Default Time Zone
      </option>
      {timeZones.map((timeZone, i) => (
        <option key={i + 1} value={timeZone.tzCode} className="py-12 hover:bg-white">
          {timeZone.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectTimeZone;
