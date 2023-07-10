"use client";
import { toRupiah } from "@/utils/convert";
import { session } from "@/utils/userAuth";
import { IconArrowLeft, IconDownload } from "@tabler/icons-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function Invoice({ id }) {
  const [data, setData] = useState({});
  const route = useRouter();
  const templateDocument = useRef();

  useEffect(() => {
    const getDetail = async () => {
      const { token } = await session();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/order/detail/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await res.json();

      setData(data);
    };

    getDetail();
  }, []);

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
            <p className="text-text">ID Transaksi {data?.transaksi_id}</p>
            <p className="text-text">
              Tanggal Transaksi{" "}
              {moment(data?.tanggal_order).locale("id").format("LLLL")}
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex-[2]">
            <h2 className="font-bold mt-8">Diterbitkan atas nama</h2>
            <p className="text-text">{data?.mitra?.user_data.nama_lengkap}</p>
            <p className="text-text">{data?.order_detail?.alamat_pesanan}</p>
          </div>

          <div className="flex-1">
            <h2 className="font-bold mt-8">Kepada</h2>
            <p className="flex justify-between">
              <span className="text-text">Nama</span>
              <span className="text-text">
                {data?.customer?.user_data.nama_lengkap}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-text">Tanggal Transaksi</span>
              <span className="text-text">
                {moment(data?.tanggal_order).locale("id").format("L")}
              </span>
            </p>
          </div>
        </div>

        {/* DETAIL ORDER */}
        <hr />
        <h2 className="font-bold my-4">Detail Order</h2>
        <hr />
        <p className="text-text">
          Jenis Layanan : {data?.order_detail?.bidang.nama_bidang}
        </p>
        <p className="text-text">Merk : {data?.order_detail?.merk}</p>
        <p className="text-text">
          Jenis Perbaikan / Pelayanan :{" "}
          {data?.order_detail?.layanan.nama_layanan}
        </p>

        {/* AKUMULASI BIAYA */}
        <h2 className="font-bold mt-8">AKumulasi Biaya</h2>
        <p className="flex justify-between w-96">
          <span className="font-bold">Metode Pembayaran</span>
          <span className="text-text">
            {data?.order_detail?.order_payment.metode_pembayaran}
          </span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Pelayanan yang dipillih</span>
          <span className="text-text">
            {toRupiah(data?.order_detail?.order_payment.biaya_pelayanan || 0)}
          </span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Biaya Perjalanan</span>
          <span className="text-text">
            {toRupiah(data?.order_detail?.order_payment.biaya_perjalanan || 0)}
          </span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Discount</span>
          <span className="text-text">
            {toRupiah(data?.order_detail?.order_payment.diskon || 0)}
          </span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Biaya Aplikasi</span>
          <span className="text-text">
            {toRupiah(data?.order_detail?.order_payment.biaya_aplikasi || 0)}
          </span>
        </p>
        {/* TOTAL */}
        <p className="flex justify-between w-96">
          <span className="font-bold">TOTAL</span>
          <span className="text-text">
            {toRupiah(data?.order_detail?.order_payment.total_biaya || 0)}
          </span>
        </p>

        <p className="text-text mt-8">Metode Pembayaran</p>

        <h2 className="font-medium ">
          {data?.order_detail?.order_payment.metode_pembayaran}
        </h2>
        <p className="text-base">
          Invoice ini sah dan diproses secara otomatis oleh komputer
        </p>
        <p className="text-base">
          Terakhir di update{" "}
          {moment(data?.last_update).locale("id").format("LLLL")}
        </p>
      </div>
    </div>
  );
}
