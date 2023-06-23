"use client";
import CardDashboard from "@/components/CardDashboard";
import useNavigate from "@/utils/dashboard/useNavigate";
import React from "react";
import Customer from "./Customer";
import Mitra from "./Mitra";
import Transaksi from "./Transaksi";
import { IconFileDollar, IconUsersGroup } from "@tabler/icons-react";
import { IconBuildingStore } from "@tabler/icons-react";

const pages = [
  { name: "Customer", element: <Customer /> },
  {
    name: "Mitra",
    element: <Mitra />,
  },
  {
    name: "Transaksi",
    element: <Transaksi />,
  },
];

export default function Home() {
  const { currentNavigate, page, toPage } = useNavigate(pages);
  return (
    <div>
      <h1 className="text-title text-2xl font-semibold">Dashboard</h1>
      <p className="text-text">Hi, Rebecca. Selamat datang di Admin Pronics!</p>

      <div className="flex gap-6 flex-wrap mt-8">
        <CardDashboard
          icon={<IconUsersGroup />}
          title="1200"
          content="Total Customer"
          className="flex-1"
        />
        <CardDashboard
          icon={<IconBuildingStore />}
          title="130"
          content="Total Mitra"
          className="flex-1"
        />
        <CardDashboard
          icon={<IconFileDollar />}
          title="3000"
          content="Total Transaksi"
          className="flex-1"
        />
      </div>

      <section className="mt-8">
        <div className="flex justify-between gap-4">
          <Button
            className="flex-1"
            onClick={() => toPage("Customer")}
            active={currentNavigate == "Customer"}
          >
            Customer
          </Button>
          <span className="w-[2px] h-11 bg-slate-200"></span>
          <Button
            className="flex-1"
            onClick={() => toPage("Mitra")}
            active={currentNavigate == "Mitra"}
          >
            Mitra
          </Button>
          <span className="w-[2px] h-11 bg-slate-200"></span>
          <Button
            className="flex-1"
            onClick={() => toPage("Transaksi")}
            active={currentNavigate == "Transaksi"}
          >
            Transaksi
          </Button>
        </div>
        <div className="contents">{page.element}</div>
      </section>
    </div>
  );
}

function Button({ className, onClick, children, active }) {
  return (
    <button
      onClick={onClick}
      className={`text-2xl font-medium rounded-lg py-2 transition-all duration-150  ${
        active ? "bg-secondary text-white" : "text-text hover:bg-slate-200"
      } ${className}`}
    >
      {children}
    </button>
  );
}
