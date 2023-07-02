"use client";
import CardDashboard from "@/components/CardDashboard";
import React from "react";
import { IconFileDollar, IconPackage } from "@tabler/icons-react";
import { toRupiah } from "@/utils/convert";

export default function Home() {
  return (
    <div>
      <h1 className="text-title text-2xl font-semibold">Dashboard</h1>
      <p className="text-text">Hi, Rebecca. Selamat datang di Mitra Anda</p>

      <div className="flex gap-6 flex-wrap mt-8">
        <CardDashboard
          icon={<IconPackage />}
          title="200"
          content="Total Order Selesai"
          className="flex-1"
        />
        <CardDashboard
          icon={<IconFileDollar />}
          title={toRupiah(2123000)}
          content="Total Pendapatan Bersih"
          className="flex-1"
        />
      </div>
    </div>
  );
}
