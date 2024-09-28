import { Textarea } from '@windmill/react-ui';
import React from 'react';

const TextAreaCom = ({
  register,
  name,
  label,
  placeholder,
  required,
  type,
  value,
}) => {
  return (
    <>
      <Textarea
        className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
        {...register(`${name}`, {
          required: required ? false : `${label} is required!`,
        })}
        
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        rows="4"
        spellCheck="false"
      />
    </>
  );
};

export default TextAreaCom;
