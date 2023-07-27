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
  order_detail_id: "",
  order_payment_id: "",
  total_biaya: "",
  metodePembayaran: "",
  uploadMetodePembayaran: "",
};

export default function OrderComponent({ id }) {
  const [id_layanan, id_mitra] = id;
  const route = useRouter();
  const [data, setData] = useState(INITIAL_DATA);
  const [detailLaynanan, setDetailLaynanan] = useState(null);
  const controller = new AbortController()

  const { step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <OrderForm id={id} {...data} updateFields={updateFields} />,
    <PelayananForm id={id} {...data} updateFields={updateFields} />,
    <MetodePembayaranForm id={id} {...data} updateFields={updateFields} />,
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
            signal: controller.signal
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
            alamat: data?.order_detail.alamat_pesanan,
            mitra: data?.mitra.nama_toko,
            order_id: data?.id,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    getTemporary();

    return ()=>controller.abort()
  }, []);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  console.log(data);

  return <div>{cloneElement(step, { next: next, back: back })}</div>;
}
