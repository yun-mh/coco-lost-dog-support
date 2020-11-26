import React from "react";

const Field = ({
  className = "appearance-none block w-full bg-gray-100 text-gray-800 border border-red rounded py-3 px-4 mb-1",
  errorClassName = "text-sm text-red-500 italic mb-2",
  hasError = true,
  type,
  name,
  errors,
  onChange,
  value,
  placeholder,
  ...props
}) => {
  return (
    <>
      <input
        className={
          errors !== undefined ? className + " border-red-500" : className
        }
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        {...props}
      />
      {hasError && <p className={errorClassName}>{errors}</p>}
    </>
  );
};

export default Field;
