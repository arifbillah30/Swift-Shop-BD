import { Input } from '@windmill/react-ui';
import React from 'react';

const SkuBarcodeInput = ({
  id,
  value,
  name,
  placeholder,
  handleSkuBarcode,
}) => {
  return (
    <>
      <Input
        onBlur={(e) => handleSkuBarcode(e.target.value, name, id)}
        defaultValue={value}
        type="text"
        name={name}
        placeholder={placeholder}
        className={`bg-gray-50 mx-1 rounded-sm h-8 w-18 md:w-20 lg:w-20 text-sm border border-gray-200 focus:bg-white focus:outline-none p-2 focus:border-green-300`}
      />
    </>
  );
};

export default SkuBarcodeInput;
