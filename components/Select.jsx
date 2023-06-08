import React from "react";

export default function Select({
  type,
  id,
  value,
  onChange,
  className,
  required,
  placeholder,
  disable = false,
  children,
}) {
  return (
    <select
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`border-text border rounded-lg py-2 pl-4 pr-4 w-full outline-none ${className}`}
      required={required}
      placeholder={placeholder}
      disabled={disable}
    >
      {children}
    </select>
  );
}
