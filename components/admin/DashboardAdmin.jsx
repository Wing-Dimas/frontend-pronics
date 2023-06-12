"use client";
import React from "react";
import Dashboard from "@/components/Dashboard";
import useNavigate from "@/utils/dashboard/useNavigate";

import Home from "./Home";
import BidangDanPelayanan from "./BidangDanPelayanan";
import Bank from "./Bank";
import Pembayaran from "./Pembayaran";

const pages = [
  { name: "Home", element: <Home />, icon: <i className="fi fi-rr-home"></i> },
  {
    name: "Bidang dan Pelayanan",
    element: <BidangDanPelayanan />,
    icon: <i className="fi fi-rr-symbol"></i>,
  },
  {
    name: "Bank",
    element: <Bank />,
    icon: <i className="fi fi-rr-wallet"></i>,
  },
  {
    name: "Pembayaran",
    element: <Pembayaran />,
    icon: <i className="fi fi-rr-usd-circle"></i>,
  },
];

export default function DashboardAdmin() {
  const { currentNavigate, page, toPage } = useNavigate(pages);
  return (
    <Dashboard>
      <Dashboard.Navbar>
        {pages.map((item) => (
          <Dashboard.Navlink
            onClick={() => toPage(item.name)}
            href="/admin"
            active={currentNavigate == item.name}
            key={item.name}
          >
            {item.icon} {item.name}
          </Dashboard.Navlink>
        ))}
      </Dashboard.Navbar>
      <Dashboard.Main>
        <Dashboard.Header>
          <Dashboard.HeaderFeature />
          <Dashboard.User />
        </Dashboard.Header>

        {page.element}
      </Dashboard.Main>
    </Dashboard>
  );
}
