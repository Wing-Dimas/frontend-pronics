import React from "react";

const color = {
  aqua: "bg-aqua",
  red: "bg-red",
  purple: "bg-purple",
  blue: "bg-secondary",
};

export default function Buttons({
  children,
  bgColor = "",
  onClick,
  type = "button",
  className,
}) {
  const bg = color[bgColor];
  return (
    <button
      className={`px-4 py-1 rounded-lg text-white ${className} ${bg}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
