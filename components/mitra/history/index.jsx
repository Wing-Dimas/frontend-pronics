"use client";
import ButtonSecondary from "@/components/ButtonSecondary";
import Buttons from "@/components/Buttons";
import { toRupiah } from "@/utils/convert";
import { session } from "@/utils/userAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function History() {
  const [kateogri, setKategori] = useState("semua");
  const [dataHistory, setDataHistory] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const getHistory = async () => {
      const { token } = await session();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/order/history/all?status=semua`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await res.json();
      setDataHistory(data);
    };
    getHistory();
  }, []);

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
        {dataHistory
          .filter((item) => kateogri === "semua" || item.status === kateogri)
          .map((item) => (
            <div className="border border-text p-4" key={item.id}>
              <div className="flex justify-between">
                <p className="text-xl font-semibold">{item.nama}</p>
                <p className="capitalize">{item.status}</p>
              </div>
              <div className="mt-4">
                <p className="text-text">{item.layanan}</p>
                <p className="mt-1">{item.alamat_pemesanan}</p>
              </div>

              <div className="flex justify-between items-end">
                <p>
                  Total Bayar :{" "}
                  <span className="font-semibold text-text">
                    {toRupiah(item.total_bayar)}
                  </span>
                </p>

                <div className="flex gap-3">
                  <Buttons
                    bgColor="purple"
                    onClick={() =>
                      route.push(`/mitra/history/${item.id}/detail`)
                    }
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
