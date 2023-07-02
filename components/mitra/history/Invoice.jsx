"use client";
import { IconArrowLeft, IconDownload } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Invoice() {
  const route = useRouter();
  const templateDocument = useRef();

  const handlePrint = useReactToPrint({
    content: () => templateDocument.current,
    documentTitle: `${Math.floor(new Date().getTime() / 1000.0)}-Invoice`,
    onPrintError: () => alert("there is an error when printing"),
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between  my-8">
        <div className="flex gap-10 h-max">
          <button
            className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
            onClick={() => route.back()}
          >
            <IconArrowLeft />
          </button>
          <h1 className="text-2xl font-medium">Invoice </h1>
        </div>
        <button className="text-xl" onClick={handlePrint}>
          <IconDownload />
        </button>
      </div>

      <div className="m-4" ref={templateDocument}>
        <div className="flex justify-between">
          <div className="-ml-9 -mt-7">
            <Image
              src="/assets/img/logo_pronics.png"
              alt="logo_proics"
              width={274}
              height={89}
              className="my-4 mx-auto"
            />
          </div>
          <div>
            {/* INVOICE */}
            <h2 className="font-bold">Invoice</h2>
            <p className="text-text">ID Transaksi #ge784djOd_sdf343f</p>
            <p className="text-text">
              Tanggal Transaksi 29 Mei 2023, 16:22 WIB
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex-[2]">
            <h2 className="font-bold mt-8">Diterbitkan atas nama</h2>
            <p className="text-text">Aurel</p>
            <p className="text-text">Jln. Anggur no. 3 RW.05 RW. 07</p>
          </div>

          <div className="flex-1">
            <h2 className="font-bold mt-8">Kepada</h2>
            <p className="flex justify-between">
              <span className="text-text">Nama</span>
              <span className="text-text">Boby Yudho</span>
            </p>
            <p className="flex justify-between">
              <span className="text-text">Tanggal Transaksi</span>
              <span className="text-text">27/03/2023</span>
            </p>
          </div>
        </div>

        {/* DETAIL ORDER */}
        <hr />
        <h2 className="font-bold my-4">Detail Order</h2>
        <hr />
        <p className="text-text">Jenis Layanan : Layanan 1</p>
        <p className="text-text">Merk : Merk 1</p>
        <p className="text-text">
          Jenis Perbaikan / Pelayanan : Pelayanan yang dipilih
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

        <p className="text-text mt-8">Metode Pembayaran</p>

        <h2 className="font-medium ">BRIVA</h2>
        <p className="text-base">
          Invoice ini sah dan diproses secara otomatis oleh komputer
        </p>
        <p className="text-base">Terakhir di update 29 Mei 2023, 21:22 WIB</p>
      </div>
    </div>
  );
}
