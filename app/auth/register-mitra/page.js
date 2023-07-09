import FormRegisterMitra from "@/components/auth/register-mitra/FormRegisterMitra";
import React from "react";

export const metadata = {
  title: "Register Mitra",
};

// GET WILAYAH
async function getWilayah() {
  const res = await fetch(`${process.env.BACKEND}/api/v1/wilayahCakupan/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataWilayah = await res.json();
  return dataWilayah;
}

// GET BIDANG DAN KATEGORI
async function getKategoriDanBidang() {
  const res = await fetch(`${process.env.BACKEND}/api/v1/kategori/all/bidang`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataKategoriDanBidang = await res.json();
  return dataKategoriDanBidang;
}

// GET BIDANG DAN KATEGORI
async function getBank() {
  const res = await fetch(`${process.env.BACKEND}/api/v1/bank/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataBank = await res.json();
  return dataBank;
}

export default async function RegisterMitra() {
  const dataWilayah = await getWilayah();
  const dataKategoriDanBidang = await getKategoriDanBidang();
  const dataBank = await getBank();
  return (
    <FormRegisterMitra
      dataWilayah={dataWilayah}
      dataKategoriDanBidang={dataKategoriDanBidang}
      dataBank={dataBank}
    />
  );
}
