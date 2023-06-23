"use client";

import Dashboard from "@/components/Dashboard";
import "@/styles/globals.css";
import {
  IconCoin,
  IconWallet,
  IconAlignRight,
  IconHome,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const pages = [
  {
    name: "Home",
    pathname: "/customer",
    icon: <IconHome />,
  },
  {
    name: "Saved",
    pathname: "/customer/saved",
    icon: <IconAlignRight />,
  },
  {
    name: "History",
    pathname: "/customer/history",
    icon: <IconWallet />,
  },
  {
    name: "Pembayaran",
    pathname: "/customer/pembayaran",
    icon: <IconCoin />,
  },
];

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
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
      </body>
    </html>
  );
}
