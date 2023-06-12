"use client";
import React from "react";
import Dropzone from "@/components/Dropzone";
import ButtonSecondary from "@/components/ButtonSecondary";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function UploadBuktiPembayaran() {
  function handleSubmit(e) {
    e.preventDefault();
    MySwal.fire("", "Pembayaran Anda Berhasil", "success");
  }
  return (
    <div className="min-h-[calc(100vh)]">
      <h1 className="text-title text-2xl font-semibold">Pembayaran</h1>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex w-full justify-center mt-8">
          <Dropzone />
        </div>

        <div className="flex justify-end mt-12">
          <ButtonSecondary type="submit">Selesai</ButtonSecondary>
        </div>
      </form>
    </div>
  );
}
