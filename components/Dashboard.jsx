"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import "@/styles/Dashboard.css";
import Image from "next/image";

import userNoImage from "@/assets/user-no-image.png";
import { IconBell, IconSettings } from "@tabler/icons-react";
import { IconMessage2 } from "@tabler/icons-react";
import { session } from "@/utils/userAuth";
import { IconLogout2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const Dashboard = ({ children }) => {
  return <>{children}</>;
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

Dashboard.Header = ({ children, className }) => {
  return (
    <header
      className={`flex justify-end items-center p-8 gap-8 h-28 ${className}`}
    >
      {children}
    </header>
  );
};

Dashboard.User = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const { user } = await session();
      setUser(user.nama_lengkap);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await fetch(`/api/auth/logout`, {
      method: "POST",
    });

    return route.push("/auth/login");
  };

  return (
    <div className="user-wrapper relative">
      <div className="user-info flex justify-center items-center gap-4 cursor-pointer">
        <p className="text-sm">
          Hello, <span className="font-medium">{user}</span>
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
      <div className="user-menu absolute hidden left-0 right-0 top-10 ">
        <ul className="bg-white rounded-xl p-1">
          <li className="p-1 bg-white rounded-xl transition-all duration-500 hover:bg-red hover:text-white">
            <button className="flex gap-3 w-full" onClick={handleLogout}>
              <IconLogout2 /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

Dashboard.HeaderFeature = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const { user } = await session();
      setUser(user);
    };

    getUser();
  }, []);

  const handleSetting = () => {
    if (user) {
      if (user.tipe === "customer") {
        route.push("/customer/settings");
      } else if (user.tipe === "mitra") {
        route.push("/mitra/settings");
      } else if (user.tipe === "admin") {
        route.push("/admin/settings");
      } else {
        route.push("/auth/login");
      }
    }
  };

  return (
    <div className="flex gap-8 border-r border-r-slate-200 pr-8">
      <div className="relative">
        <button className="flex justify-center items-center w-12 h-12 rounded-lg bg-blueTransparant text-secondary text-xl">
          <IconBell />
        </button>
        <span className="total-notif absolute -top-2 -right-2 rounded-full bg-secondary border-2 border-white text-white">
          21
        </span>
      </div>
      <div className="relative">
        <button className="flex justify-center items-center w-12 h-12 rounded-lg bg-blueTransparant text-secondary text-xl">
          <IconMessage2 />
        </button>
        <span className="total-notif absolute -top-2 -right-2 rounded-full bg-secondary border-2 border-white text-white">
          53
        </span>
      </div>
      <div className="relative">
        <button
          className="flex justify-center items-center w-12 h-12 rounded-lg bg-redTransparant text-red text-xl"
          onClick={handleSetting}
        >
          <IconSettings />
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
