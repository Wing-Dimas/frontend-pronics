"use client";

import Dashboard from "@/components/Dashboard";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "Admin",
  description: "Pronic menyediakan segala hal",
};

const pages = [
  {
    name: "Home",
    pathname: "/admin",
    icon: <i className="fi fi-rr-home"></i>,
  },
  {
    name: "Bidang dan Pelayanan",
    pathname: "/admin/bidang-dan-pelayanan",
    icon: <i className="fi fi-rr-symbol"></i>,
  },
  {
    name: "Bank",
    pathname: "/admin/bank",
    icon: <i className="fi fi-rr-wallet"></i>,
  },
  {
    name: "Pembayaran",
    pathname: "/admin/pembayaran",
    icon: <i className="fi fi-rr-usd-circle"></i>,
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
