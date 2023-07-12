"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import InputTextarea from "@/components/InputTextarea";
import ButtonSecondary from "@/components/ButtonSecondary";
import { session } from "@/utils/userAuth";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

export default function TambahAlamatCustomer() {
  const route = useRouter();
  const [alamat, setAlamat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = await session();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/alamat/save`,
      {
        method: "POST",
        body: JSON.stringify({ alamat: alamat }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { meta, data } = await res.json();

    if (meta.code === 200) {
      MySwal.fire({
        title: meta?.message,
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          return route.push("/customer/settings/profile");
        }
      });
    } else {
      MySwal.fire({
        title: meta?.message,
        text: data,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <div className="container mx-auto rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <div className="flex gap-10 h-max">
        <Link
          href="/customer/settings/profile"
          className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
        >
          <IconArrowLeft />
        </Link>
        <h1 className="text-2xl font-medium">Tambah Alamat Baru</h1>
      </div>

      <div className="mx-16 mt-12">
        <form onSubmit={handleSubmit}>
          {/* ALAMAT */}
          <div className="grid grid-cols-2 w-[500px] gap-2">
            <label htmlFor="alamat" className="text-text my-auto">
              Detail Alamat
            </label>
            <InputTextarea
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Contoh: Blok/Unit Np., Patokan"
              required={true}
            ></InputTextarea>
          </div>

          <div className="mt-4 flex justify-end">
            <ButtonSecondary type="submit">Simpan</ButtonSecondary>
          </div>
        </form>
      </div>
    </div>
  );
}
