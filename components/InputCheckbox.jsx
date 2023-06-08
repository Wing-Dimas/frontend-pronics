import React from "react";
import icon from "../assets/checklist.svg";
import Image from "next/image";

export default function InputCheckbox({
  name,
  id,
  value,
  onChange,
  checked,
  text,
  className,
}) {
  return (
    <label
      htmlFor={id}
      className={`checkbox-label hover:cursor-pointer ${className}`}
    >
      <input
        className="checkbox-input"
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className="custom-checkbox">
        <Image
          src={icon}
          width="auto"
          height="auto"
          alt="checklist"
          className="mt-[3px] ml-px"
        />
      </span>
      <span
        className={`text-lg font-medium ${
          checked ? "text-secondary" : "text-text"
        }`}
      >
        {text}
      </span>
    </label>
  );
}
