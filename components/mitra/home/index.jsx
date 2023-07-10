"use client";
import CardDashboard from "@/components/CardDashboard";
import { IconFileDollar, IconPackage } from "@tabler/icons-react";
import { toRupiah } from "@/utils/convert";
import React, { useEffect, useState } from "react";
import { session } from "@/utils/userAuth";

export default function Home() {
  const [user, setUser] = useState("");
  const [totalOrderSelesai, setTotalOrderSelesai] = useState(0);
  const [totalPendapatanBersih, setTotalPendapatanBersih] = useState(0);

  useEffect(() => {
    const getDashboardSummary = async () => {
      const { token, user } = await session();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/mitra/dashboardSummary`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());

      const {
        data: { total_order_selesai, total_pendapatan_bersih },
      } = res;

      setUser(user.nama_lengkap);
      setTotalOrderSelesai(total_order_selesai);
      setTotalPendapatanBersih(total_pendapatan_bersih);
    };

    getDashboardSummary();
  }, []);
  return (
    <div>
      <h1 className="text-title text-2xl font-semibold">Dashboard</h1>
      <p className="text-text">Hi, {user}. Selamat datang di Mitra Anda</p>

      <div className="flex gap-6 flex-wrap mt-8">
        <CardDashboard
          icon={<IconPackage />}
          title={totalOrderSelesai}
          content="Total Order Selesai"
          className="flex-1"
        />
        <CardDashboard
          icon={<IconFileDollar />}
          title={toRupiah(totalPendapatanBersih)}
          content="Total Pendapatan Bersih"
          className="flex-1"
        />
      </div>
    </div>
  );
}
