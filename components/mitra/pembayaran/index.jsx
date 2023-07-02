"use client";
import Buttons from "@/components/Buttons";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

const deafult_list = [
  { id: 1, name: "AC" },
  { id: 2, name: "TV" },
  { id: 3, name: "Handphone" },
];

export default function Pembayaran() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-title text-2xl font-semibold">Pembayaran</h1>

      <div>
        <span>Total belum dibayar oleh perusahaan : Rp. 110.000</span>
        <Buttons
          bgColor="blue"
          onClick={() =>
            router.push("/mitra/pembayaran/upload-bukti-pembayaran")
          }
          className="ml-4"
        >
          Bayar Sekarang
        </Buttons>
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <div className="flex flex-col w-full p-4 border border-text">
          <div className="flex justify-between">
            <h3 className="font-bold text-title text-lg">Nama Customer</h3>
            <p>Sudah Dibayar</p>
          </div>
          <div className="felx flex-col gap-3">
            <p className="font-medium text-sm text-text">AC Rusak</p>
            <p className="font-medium text-sm text-text">Pelayanan</p>
          </div>
          <div className="flex justify-between items-end">
            <span>
              Total Bayar :{" "}
              <span className="text-text font-bold">Rp. 150.000</span>
            </span>
            <Buttons
              bgColor="purple"
              type="button"
              onClick={() => router.push("/mitra/pembayaran/detail")}
            >
              Detail
            </Buttons>
          </div>
        </div>
        <div className="flex flex-col w-full p-4 border border-text">
          <div className="flex justify-between">
            <h3 className="font-bold text-title text-lg">Nama Customer</h3>
            <p>Sudah Dibayar</p>
          </div>
          <div className="felx flex-col gap-3">
            <p className="font-medium text-sm text-text">AC Rusak</p>
            <p className="font-medium text-sm text-text">Pelayanan</p>
          </div>
          <div className="flex justify-between items-end">
            <span>
              Total Bayar :{" "}
              <span className="text-text font-bold">Rp. 150.000</span>
            </span>
            <Buttons
              bgColor="purple"
              type="button"
              onClick={() => router.push("/mitra/pembayaran/detail")}
            >
              Detail
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
}
