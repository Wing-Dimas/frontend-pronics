import React from "react";

export default function InputText({
  type,
  id,
  value,
  onChange,
  className,
  required,
  placeholder,
  disable = false,
}) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`border-text border rounded-lg py-2 pl-4 pr-4 w-full outline-none ${className}`}
      required={required}
      placeholder={placeholder}
      disabled={disable}
    />
  );
}
