"use client";
import Buttons from "@/components/Buttons";
import Link from "next/link";
import React, { useState } from "react";

export default function DetailPembayaran() {
  const [name, setName] = useState("");
  const [kategori, setKategori] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, kategori);
  }

  return (
    <div className="rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <div className="flex gap-10 h-max">
        <Link
          href="/admin/pembayaran"
          className="flex justify-center items-center text-3xl pt-2 w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
        >
          <i className="fi fi-rr-arrow-small-left"></i>
        </Link>
        <h1 className="text-2xl font-medium">Detail History </h1>
      </div>

      <div className="mx-16 mt-12">
        {/* SELESAI */}
        <h2 className="font-bold">Selesai</h2>
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

        {/* LOKASI TUKANG */}
        <h2 className="font-bold mt-8">Lokasi Tukang</h2>
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
