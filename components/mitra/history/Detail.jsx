"use client";
import ButtonSecondary from "@/components/ButtonSecondary";
import { toRupiah } from "@/utils/convert";
import { session } from "@/utils/userAuth";
import { IconArrowLeft } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Detail({ id }) {
  const route = useRouter();
  const [data, setData] = useState();

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

  return (
    <div className="rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <div className="flex justify-between">
        <div className="flex gap-10 h-max">
          <Link
            href="/mitra/history"
            className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
          >
            <IconArrowLeft />
          </Link>
          <h1 className="text-2xl font-medium">Detail History </h1>
        </div>
        <div className="flex gap-3">
          <ButtonSecondary
            onClick={() => route.push(`/mitra/history/${id}/komentar`)}
          >
            Lihat Kometar
          </ButtonSecondary>
          <ButtonSecondary
            onClick={() => route.push(`/mitra/history/${id}/invoice`)}
          >
            Cetak Invoice
          </ButtonSecondary>
        </div>
      </div>
      <div className="mx-16 mt-12">
        {/* SELESAI */}
        <h2 className="font-bold">Pesanan Masuk</h2>
        <p className="text-text">ID Transaksi {data?.transaksi_id}</p>
        <p className="text-text">
          Tanggal Transaksi{" "}
          {moment(data?.tanggal_order).locale("id").format("LLLL")}
        </p>
        {/* DETAIL ORDER */}
        <h2 className="font-bold mt-8">Detail Order</h2>
        <p className="text-text">
          Jenis Layanan : {data?.order_detail.bidang.nama_bidang}
        </p>
        <p className="text-text">Merk : {data?.order_detail.merk}</p>
        <p className="text-text">
          Jenis Perbaikan / Pelayanan :{" "}
          {data?.order_detail.layanan.nama_layanan}
        </p>
        <p className="text-text">Deskripsi Kerusakan :</p>
        <p className="text-text">{data?.order_detail.deskripsi_kerusakan}</p>
        {/* LOKASI MITRA */}
        <h2 className="font-bold mt-8">Lokasi Mitra</h2>
        <p className="text-text">{data?.order_detail.alamat_pesanan}</p>
        {/* AKUMULASI BIAYA */}
        <h2 className="font-bold mt-8">AKumulasi Biaya</h2>
        <p className="flex justify-between w-96">
          <span className="font-bold">Metode Pembayaran</span>
          <span className="text-text">
            {data?.order_detail.order_payment.metode_pembayaran}
          </span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Pelayanan yang dipillih</span>
          <span className="text-text">
            {toRupiah(data?.order_detail.order_payment.biaya_pelayanan || 0)}
          </span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Biaya Perjalanan</span>
          <span className="text-text">
            {toRupiah(data?.order_detail.order_payment.biaya_perjalanan || 0)}
          </span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Discount</span>
          <span className="text-text">
            {toRupiah(data?.order_detail.order_payment.diskon || 0)}
          </span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-bold">Biaya Aplikasi</span>
          <span className="text-text">
            {toRupiah(data?.order_detail.order_payment.biaya_aplikasi || 0)}
          </span>
        </p>
        {/* TOTAL */}
        <p className="flex justify-between w-96">
          <span className="font-bold">TOTAL</span>
          <span className="text-text">
            {toRupiah(data?.order_detail.order_payment.total_biaya || 0)}
          </span>
        </p>
      </div>
    </div>
  );
}
