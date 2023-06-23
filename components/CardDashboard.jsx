import React from "react";

export default function CardDashboard({ icon, title, content, className }) {
  return (
    <div
      className={`flex gap-6 rounded-lg shadow-lg p-7 min-w-max bg-white ${className}`}
    >
      <div className="flex justify-center items-center bg-blueTransparant text-secondary text-2xl rounded-full overflow-hidden w-14 h-14 ">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-title">{title}</h2>
        <p className="text-text text-sm font-normal">{content}</p>
      </div>
    </div>
  );
}
