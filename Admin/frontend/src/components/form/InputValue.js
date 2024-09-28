import { Input } from "@windmill/react-ui";

const InputValue = ({
  register,
  required,
  maxValue,
  minValue,
  defaultValue,
  name,
  label,
  type,
  placeholder,
  currency,
  product,
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
  };

  return (
    <>
      <div className={`flex flex-row`}>
        {product && (
          <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white focus:border-green-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
            {currency}
          </span>
        )}
        <Input
          {...register(`${name}`, value)}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          name={name}
          step={0.01}
          className={`bg-gray-50 mr-2 rounded w-full h-12 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none ${
            product && "rounded-l-none"
          }`}
        />
      </div>
    </>
  );
};

export default InputValue;
