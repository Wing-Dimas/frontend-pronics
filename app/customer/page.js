import Home from "@/components/customer/Home";
import React from "react";

export const metadata = {
  title: "Customer | Home",
  description: "Pronic menyediakan segala hal",
};

// GET WILAYAH
async function getWilayah() {
  const res = await fetch(`${process.env.BACKEND}/api/v1/wilayahCakupan/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await res.json();
  const kategori = data.map((item) => item.nama_wilayah);
  return kategori;
}

// GET KATEGORI
async function getKategori() {
  const res = await fetch(`${process.env.BACKEND}/api/v1/kategori/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await res.json();
  const kateogri = data.map((item) => item.nama_kategori);
  return kateogri;
}

export default async function Customer() {
  const dataWilayah = await getWilayah();
  const dataKategori = await getKategori();
  return <Home dataWilayah={dataWilayah} dataKategori={dataKategori} />;
}
