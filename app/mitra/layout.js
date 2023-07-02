"use client";

import Dashboard from "@/components/Dashboard";
import "@/styles/globals.css";
import {
  IconCoin,
  IconWallet,
  IconHome,
  IconPackage,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const pages = [
  {
    name: "Home",
    pathname: "/mitra",
    icon: <IconHome />,
  },
  {
    name: "Order",
    pathname: "/mitra/order",
    icon: <IconPackage />,
  },
  {
    name: "History",
    pathname: "/mitra/history",
    icon: <IconWallet />,
  },
  {
    name: "Pembayaran",
    pathname: "/mitra/pembayaran",
    icon: <IconCoin />,
  },
];

const pathNoLayout = ["/mitra/history/invoice"];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isNoLayout = pathNoLayout.some((path) => path === pathname);

  if (isNoLayout) {
    return (
      <html lang="en">
        <body className="overflow-x-hidden bg-[#F3F2F7]">{children}</body>
      </html>
    );
  }

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
