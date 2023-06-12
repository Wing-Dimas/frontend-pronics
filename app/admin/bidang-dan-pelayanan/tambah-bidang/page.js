"use client";
import Buttons from "@/components/Buttons";
import Link from "next/link";
import React, { useState } from "react";

export default function TambahBidang() {
  const [name, setName] = useState("");
  const [kategori, setKategori] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, kategori);
  }

  return (
    <div className="bg-white rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <div className="flex gap-10 h-max">
        <Link
          href="/admin/bidang-dan-pelayanan"
          className="flex justify-center items-center text-3xl pt-2 w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
        >
          <i className="fi fi-rr-arrow-small-left"></i>
        </Link>
        <h1 className="text-2xl font-medium">Tambah Bidang</h1>
      </div>

      <form
        action=""
        className="flex flex-col justify-between min-h-[calc(100vh_-_300px)] mt-12 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-1 flex-col mx-16 gap-4 h-max">
          <input
            type="text"
            placeholder="Nama Bidang"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-6 px-7 shadow-lg rounded-lg outline-none h-max"
          />
          <select
            className="w-full py-6 px-7 shadow-lg rounded-lg outline-none h-max"
            onChange={(e) => setKategori(e.target.value)}
            value={kategori || ""}
          >
            <option value="">kategori</option>
            <option value="nothing">Nothing</option>
          </select>
        </div>

        <div className="flex justify-end">
          <Buttons type="submit" bgColor="blue" className="mx-16">
            Simpan
          </Buttons>
        </div>
      </form>
    </div>
  );
}
