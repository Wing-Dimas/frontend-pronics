"use client";
import ButtonSecondary from "@/components/ButtonSecondary";
import Buttons from "@/components/Buttons";
import { toRupiah } from "@/utils/convert";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DEFAULT_HISTORY = [
  {
    id: 1,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "ditolak",
  },
  {
    id: 3,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "dibatalkan",
  },
  {
    id: 4,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "selesai",
  },
];

export default function History() {
  const [kateogri, setKategori] = useState("semua");
  const route = useRouter();

  return (
    <>
      <h1 className="text-title text-2xl font-semibold">History</h1>

      <div className="flex gap-3 mt-4">
        <ButtonSecondary
          className={kateogri === "semua" && "bg-secondary text-white"}
          onClick={() => setKategori("semua")}
        >
          Semua
        </ButtonSecondary>
        <ButtonSecondary
          className={kateogri === "dibatalkan" && "bg-secondary text-white"}
          onClick={() => setKategori("dibatalkan")}
        >
          Dibatalkan
        </ButtonSecondary>
        <ButtonSecondary
          className={kateogri === "ditolak" && "bg-secondary text-white"}
          onClick={() => setKategori("ditolak")}
        >
          Ditolak
        </ButtonSecondary>
        <ButtonSecondary
          className={kateogri === "selesai" && "bg-secondary text-white"}
          onClick={() => setKategori("selesai")}
        >
          Selesai
        </ButtonSecondary>
      </div>

      <div className="grid gap-8 mt-4">
        {DEFAULT_HISTORY.filter(
          (item) => kateogri === "semua" || item.status === kateogri
        ).map((item) => (
          <div className="border border-text p-4" key={item.id}>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">{item.name}</p>
              <p className="capitalize">{item.status}</p>
            </div>
            <div className="mt-4">
              <p className="text-text">{item.layanan}</p>
              <p className="mt-1">{item.alamat}</p>
            </div>

            <div className="flex justify-between items-end">
              <p>
                Total Bayar :{" "}
                <span className="font-semibold text-text">
                  {toRupiah(item.totalBayar)}
                </span>
              </p>

              <div className="flex gap-3">
                <Buttons
                  bgColor="purple"
                  onClick={() => route.push("/mitra/history/detail")}
                >
                  Detail
                </Buttons>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
