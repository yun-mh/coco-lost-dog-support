import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Field = ({ 
    className = "appearance-none block w-full bg-gray-100 text-gray-800 border border-red rounded py-3 px-4 mb-3", 
    errorClassName = "", 
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
      <input className={className} type={type} name={name} onChange={onChange} value={value} placeholder={placeholder} {...props} />
      <p className={errorClassName}>{errors}</p>
    </>
  );
};

export default Field;
