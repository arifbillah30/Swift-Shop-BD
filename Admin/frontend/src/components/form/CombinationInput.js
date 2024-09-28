import { Input } from "@windmill/react-ui";
import React from "react";

const CombinationInput = ({
  id,
  value,
  name,
  variant,
  readOnly,
  isBulkUpdate,
  placeholder,
  handleQuantityPrice,
}) => {
  return (
    <>
      {isBulkUpdate && (
        <Input
          onChange={handleQuantityPrice}
          disabled={readOnly}
          value={value || 0}
          type="number"
          name={name}
          pattern="^[0-9]+$"
          placeholder={placeholder}
          className={`bg-gray-50 mx-1 rounded-sm h-8 w-18 md:w-20 lg:w-20 text-sm border dark:text-gray-300 border-gray-200 focus:bg-white focus:outline-none p-2 focus:border-green-300`}
        />
      )}
      {!isBulkUpdate && (
        <Input
          onBlur={(e) => handleQuantityPrice(e.target.value, name, id, variant)}
          disabled={readOnly}
          defaultValue={value}
          type="number"
          name={name}
          pattern="^[0-9]+$"
          placeholder={placeholder}
          className={`bg-gray-50 mx-1 rounded-sm h-8 w-18 md:w-20 lg:w-20 text-sm border dark:text-gray-300 border-gray-200 focus:bg-white focus:outline-none p-2 focus:border-green-300`}
        />
      )}
    </>
  );
};

export default CombinationInput;
