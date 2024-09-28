import { Input } from '@windmill/react-ui';

const InputValueFive = ({
  register,
  required,
  maxValue,
  minValue,
  defaultValue,
  name,
  label,
  type,
  placeholder,

}) => {
  const value = {
    valueAsNumber: true,
    required: required ? false : `${label} is required!`,
    max: {
      value: maxValue,
      message: `Maximum value ${maxValue}!`,
    },
    min: {
      value: minValue,
      message: `Minimum value ${minValue}!`,
    },
    pattern: {
      value: /^[0-9]*$/,
      message: `Invalid ${label}!`,
    },
    // onBlur: (e) => handleTotalVolume(e.target.value, 'stock'),
  };

  return (
    <>
      <div className={`flex flex-row`}>
        <Input
          {...register(`${name}`, value)}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          name={name}
          className="bg-gray-50 mr-2 rounded  w-full h-12 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none"
        />
      </div>
    </>
  );
};

export default InputValueFive;
