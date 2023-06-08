import React from "react";

export default function ButtonSecondary({
  onClick,
  className,
  type,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-9 rounded-lg border border-secondary text-secondary text-xl font-bold transition-all duration-500 hover:bg-secondary hover:text-white ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}
