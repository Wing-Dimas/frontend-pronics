"use client";

import Dashboard from "@/components/Dashboard";
import "@/styles/globals.css";
import { IconCoin } from "@tabler/icons-react";
import { IconWallet } from "@tabler/icons-react";
import { IconAlignRight } from "@tabler/icons-react";
import { IconHome } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const pages = [
  {
    name: "Home",
    pathname: "/admin",
    icon: <IconHome />,
  },
  {
    name: "Bidang dan Pelayanan",
    pathname: "/admin/bidang-dan-pelayanan",
    icon: <IconAlignRight />,
  },
  {
    name: "Bank",
    pathname: "/admin/bank",
    icon: <IconWallet />,
  },
  {
    name: "Pembayaran",
    pathname: "/admin/pembayaran",
    icon: <IconCoin />,
  },
];

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <div className="overflow-x-hidden">
      <Dashboard>
        <Dashboard.Navbar>
          {pages.map((item, i) => (
            <Dashboard.Navlink
              href={item.pathname}
              active={pathname === item.pathname}
              key={i}
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

          {children}
        </Dashboard.Main>
      </Dashboard>
    </div>
  );
}
