"use client";
import useMultiStepForm from "@/utils/multi-part-steps/useMultiStepForm";
import { useRouter } from "next/navigation";
import React, { cloneElement, useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import PelayananForm from "./PelayananForm";
import MetodePembayaranForm from "./MetodePembayaranForm";
import { session } from "@/utils/userAuth";

const INITIAL_DATA = {
  merk: "",
  bidang: "",
  layanan: "",
  deskripsi: "",
  alamat: null,
  jenisPelayanan: "",
  alamat: "",
  mitra: "",
  order_id: "",
  metodePembayaran: "",
  uploadMetodePembayaran: "",
};

export default function OrderComponent({ id }) {
  const [id_layanan, id_mitra] = id;
  const route = useRouter();
  const [data, setData] = useState(INITIAL_DATA);
  const [detailLaynanan, setDetailLaynanan] = useState(null);

  const { step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <OrderForm id={id} {...data} updateFields={updateFields} />,
    <PelayananForm id={id} {...data} updateFields={updateFields} />,
    <MetodePembayaranForm {...data} updateFields={updateFields} />,
  ]);

  useEffect(() => {
    const getTemporary = async () => {
      try {
        const { token } = await session();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/order/createTemporary/${id_mitra}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = await res.json();
        setData((prev) => {
          return {
            ...prev,
            merk: data?.order_detail.merk,
            bidang: data?.order_detail.bidang.ID,
            layanan: data?.order_detail.layanan.id,
            deskripsi: data?.order_detail.deskripsi_kerusakan,
            alamat: data?.customer.alamat,
            mitra: data?.mitra.nama_toko,
            order_id: data?.id,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    getTemporary();
  }, []);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();
    console.log(data);
    route.push("/customer/pembayaran/success");
  }

  console.log(data);

  return <div>{cloneElement(step, { next: next, back: back })}</div>;
}
