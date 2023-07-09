"use client";

import Dashboard from "@/components/Dashboard";
import Loader from "@/components/Loader";
import "@/styles/globals.css";
import { session } from "@/utils/userAuth";
import {
  IconCoin,
  IconWallet,
  IconHome,
  IconPackage,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = async () => {
      const data = await session();

      if (!data?.user?.tipe === "mitra" || !data?.token) {
        return route.push("/auth/login");
      }

      setIsLoading(false);
    };
    isAuth();
  }, []);

  const isNoLayout = pathNoLayout.some((path) => path === pathname);

  if (isLoading) {
    return <Loader />;
  }

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
