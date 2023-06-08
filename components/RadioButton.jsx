import React from "react";
import icon from "../assets/checklist.svg";
import Image from "next/image";

export default function RadioButton({
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
      className={`radio-label hover:cursor-pointer ${className}`}
    >
      <input
        className="radio-input"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className="custom-radio">
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
