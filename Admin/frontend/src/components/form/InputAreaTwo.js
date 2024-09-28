import { Input } from '@windmill/react-ui';

const InputAreaTwo = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type,
  placeholder,
}) => {
  return (
    <>
      <Input
        {...register(`${name}`, {
          required: required ? false : `${label} is required!`,
        })}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete="new-password"
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
      />
    </>
  );
};

export default InputAreaTwo;
