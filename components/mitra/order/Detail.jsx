"use client";
import Buttons from "@/components/Buttons";
import { IconArrowLeft, IconLocation } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DetailOrder() {
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
    <div className="rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <div className="flex justify-between">
        <div className="flex gap-10 h-max">
          <Link
            href="/admin/pembayaran"
            className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
          >
            <IconArrowLeft />
          </Link>
          <h1 className="text-2xl font-medium">Detail History </h1>
        </div>
        <div className="flex gap-3">
          <button
            className="flex justify-center items-center w-12 h-12 rounded-lg bg-blueTransparant text-secondary text-xl"
            onClick={() => route.push("/mitra/order/detail")}
          >
            <IconLocation />
          </button>

          <Buttons bgColor="red" onClick={handleTolak}>
            Tolak
          </Buttons>
          <Buttons bgColor="green" onClick={handleTerima}>
            Terima
          </Buttons>
        </div>
      </div>

      <div className="mx-16 mt-12">
        {/* SELESAI */}
        <h2 className="font-bold">Pesanan Masuk</h2>
        <p className="text-text">ID Transaksi #ge784djOd_sdf343f</p>
        <p className="text-text">Tanggal Transaksi 29 Mei 2023, 16:22 WIB</p>

        {/* DETAIL ORDER */}
        <h2 className="font-bold mt-8">Detail Order</h2>
        <p className="text-text">Jenis Layanan : Layanan 1</p>
        <p className="text-text">Merk : Merk 1</p>
        <p className="text-text">
          Jenis Perbaikan / Pelayanan : Pelayanan yang dipilih
        </p>
        <p className="text-text">Deskripsi Kerusakan :</p>
        <p className="text-text">AC Rusak</p>

        {/* LOKASI MITRA */}
        <h2 className="font-bold mt-8">Lokasi Mitra</h2>
        <p className="text-text">
          Jl. Delima, Tanjung Barat, Jagakarsa, Jaksel 12560.
        </p>

        {/* AKUMULASI BIAYA */}
        <h2 className="font-bold mt-8">AKumulasi Biaya</h2>
        <p className="flex justify-between w-96">
          <span className="font-bold">Metode Pembayaran</span>
          <span className="text-text">BRIVA</span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Pelayanan yang dipillih</span>
          <span className="text-text">RP. 50.000</span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Biaya Perjalanan (4,2 km)</span>
          <span className="text-text">RP. 8.500</span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Discount</span>
          <span className="text-text">Rp. 0</span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Biaya Aplikasi</span>
          <span className="text-text">Rp. 2.000</span>
        </p>
        {/* TOTAL */}
        <p className="flex justify-between w-96">
          <span className="font-bold">TOTAL</span>
          <span className="text-text">Rp. 60.500</span>
        </p>
      </div>
    </div>
  );
}