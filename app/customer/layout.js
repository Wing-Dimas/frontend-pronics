"use client";

import Dashboard from "@/components/Dashboard";
import Loader from "@/components/Loader";
import "@/styles/globals.css";
import { session } from "@/utils/userAuth";
import {
  IconCoin,
  IconWallet,
  IconAlignRight,
  IconHome,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const pathOnlyHeader = [
  "/customer/detail-toko",
  "/customer/order",
  "/customer/pembayaran/success",
  "/customer/history/komentar",
];

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const isOnlyHeader = pathOnlyHeader.some((path) => path === pathname);

  useEffect(() => {
    const isAuth = async () => {
      const data = await session();

      if (!data?.user?.tipe === "customer" || !data?.token) {
        return route.push("/auth/login");
      }

      setIsLoading(false);
    };
    isAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isOnlyHeader) {
    return (
      <html lang="en">
        <body className="overflow-x-hidden bg-[#F3F2F7]">
          <Dashboard>
            <Dashboard.Header className="shadow-lg bg-white">
              <Dashboard.HeaderFeature />
              <Dashboard.User />
            </Dashboard.Header>

            {children}
          </Dashboard>
        </body>
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
