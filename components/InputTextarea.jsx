import React from "react";

export default function InputTextarea({
  id,
  value,
  onChange,
  className,
  required,
  placeholder,
  cols,
  rows,
  children,
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      className={`border-text border rounded-lg py-2 pl-4 pr-12 w-full outline-none ${className}`}
      required={required}
      placeholder={placeholder}
      cols={cols}
      rows={rows}
    >
      {children}
    </textarea>
  );
}
