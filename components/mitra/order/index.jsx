"use client";
import ButtonSecondary from "@/components/ButtonSecondary";
import Buttons from "@/components/Buttons";
import { toRupiah } from "@/utils/convert";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DEFAULT_HISTORY = [
  {
    id: 1,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "proses",
  },
  {
    id: 3,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "selesai",
  },
  {
    id: 4,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "menunggu",
  },
  {
    id: 5,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "pesanan masuk",
  },
];

export default function Order() {
  const [kateogri, setKategori] = useState("semua");
  const route = useRouter();

  function handleTolak(e) {
    MySwal.fire({
      title: "Apakah Anda yakin menolak pesanan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Menolak", "Anda berhasil menolak pesanan", "success");
      }
    });
  }
  function handleTerima(e) {
    MySwal.fire({
      title: "Apakah Anda yakin ingin menerima pesanan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Menerima", "Anda berhasil menrima pesanan", "success");
      }
    });
  }

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
          className={kateogri === "menunggu" && "bg-secondary text-white"}
          onClick={() => setKategori("menunggu")}
        >
          Menunggu
        </ButtonSecondary>
        <ButtonSecondary
          className={kateogri === "proses" && "bg-secondary text-white"}
          onClick={() => setKategori("proses")}
        >
          Proses
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
                  onClick={() => route.push("/mitra/order/detail")}
                >
                  Detail
                </Buttons>
                <Buttons bgColor="red" onClick={handleTolak}>
                  Tolak
                </Buttons>
                <Buttons bgColor="green" onClick={handleTerima}>
                  Terima
                </Buttons>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
