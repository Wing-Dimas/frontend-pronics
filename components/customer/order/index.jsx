"use client";
import useMultiStepForm from "@/utils/multi-part-steps/useMultiStepForm";
import { useRouter } from "next/navigation";
import React, { cloneElement, useState } from "react";
import OrderForm from "./OrderForm";
import PelayananForm from "./PelayananForm";
import MetodePembayaranForm from "./MetodePembayaranForm";

const INITIAL_DATA = {
  merk: "",
  layanan: "",
  deskripsi: "",
  alamat: null,
  jenisPelayanan: "",
  alamat: "",
  metodePembayaran: "",
  uploadMetodePembayaran: "",
};

export default function OrderComponent() {
  const route = useRouter();
  const [data, setData] = useState(INITIAL_DATA);

  const { step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <OrderForm {...data} updateFields={updateFields} />,
    <PelayananForm {...data} updateFields={updateFields} />,
    <MetodePembayaranForm {...data} updateFields={updateFields} />,
  ]);

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

  return (
    <form onSubmit={handleSubmit}>
      {cloneElement(step, { next: next, back: back })}
    </form>
  );
}
