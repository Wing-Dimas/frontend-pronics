"use client";
import Link from "next/link";
import React from "react";

import "@/styles/Dashboard.css";
import Image from "next/image";

import userNoImage from "@/assets/user-no-image.png";

const Dashboard = ({ children }) => {
  return <div className="">{children}</div>;
};

Dashboard.Navbar = ({ children }) => {
  return (
    <aside className="aside">
      <Image
        src="/assets/img/logo_pronics.png"
        alt="logo_proics"
        width={274}
        height={89}
        className="my-4 mx-auto"
      />
      <ul className="w-full">
        <li className="w-full pr-4">{children}</li>
      </ul>
    </aside>
  );
};

Dashboard.Navlink = ({ children, active, href }) => {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-4 pl-12 py-4 text-lg font-medium overflow-hidden whitespace-nowrap rounded-r-full hover:bg-blueTransparant transition-all duration-150 ${
        active && "bg-blueTransparant active text-secondary"
      }`}
    >
      {children}
    </Link>
  );
};

Dashboard.Header = ({ children }) => {
  return (
    <header className="flex justify-end items-center p-8 gap-8 h-28">
      {children}
    </header>
  );
};

Dashboard.User = ({ children }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <p className="text-sm">
        Hello, <span className="font-medium">Rebecca</span>
      </p>
      <div className="rounded-full overflow-hidden w-11 h-w-11">
        <Image
          src={userNoImage}
          width="auto"
          height="auto"
          alt="user-image"
          className="object-cover"
        />
      </div>
    </div>
  );
};

Dashboard.HeaderFeature = ({ children }) => {
  return (
    <div className="flex gap-8 border-r border-r-slate-200 pr-8">
      <div className="relative">
        <button className="flex justify-center items-center w-12 h-12 rounded-lg bg-blueTransparant text-secondary pt-2 text-xl">
          <i className="fi fi-rr-bell"></i>
        </button>
        <span className="total-notif absolute -top-2 -right-2 rounded-full bg-secondary border-2 border-white text-white">
          21
        </span>
      </div>
      <div className="relative">
        <button className="flex justify-center items-center w-12 h-12 rounded-lg bg-blueTransparant text-secondary pt-2 text-xl">
          <i className="fi fi-rr-comment-alt-dots"></i>
        </button>
        <span className="total-notif absolute -top-2 -right-2 rounded-full bg-secondary border-2 border-white text-white">
          53
        </span>
      </div>
      <div className="relative">
        <button className="flex justify-center items-center w-12 h-12 rounded-lg bg-redTransparant text-red pt-2 text-xl">
          <i className="fi fi-rr-settings"></i>
        </button>
        <span className="total-notif absolute -top-2 -right-2 rounded-full bg-red border-2 border-white text-white">
          19
        </span>
      </div>
    </div>
  );
};

Dashboard.Main = ({ children }) => {
  return <main className="main p-8">{children}</main>;
};

export default Dashboard;