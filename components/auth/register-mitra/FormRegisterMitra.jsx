"use client";
import React, { useState } from "react";
import useMultiStepForm from "@/utils/multi-part-steps/useMultiStepForm";
import "@/styles/FormRegisterMitra.css";
import ProfileForm from "./ProfileForm";
import ButtonSecondary from "@/components/ButtonSecondary";
import AddressAndServiceForm from "./AddressAndServiceForm";
import BankForm from "./BankForm";

const INITIAL_DATA = {
  type: "",
  nama: "",
  handphone: "",
  deskripsiDiri: "",
  email: "",
  password: "",
  alamat: "",
  wilayah: "",
  servicesElektronik: [],
  servicesOtomotif: [],
  servicesPeralatan: [],
  nasabah: "",
  bank: "",
  norek: "",
  picture: "",
};

export default function FormRegisterMitra() {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <ProfileForm {...data} updateFields={updateFields} />,
    <AddressAndServiceForm {...data} updateFields={updateFields} />,
    <BankForm {...data} updateFields={updateFields} />,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    next();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="shadow-[3px_3px_5px_5px_rgba(116,116,116,0.25)] p-16 mt-8">
          <h1 className="text-center text-4xl font-bold">
            Daftar Sebagai Mitra
          </h1>

          {step}

          <div className="flex justify-end gap-4 mt-4">
            {!isFirstStep && (
              <ButtonSecondary type="button" onClick={back}>
                Sebelumnya
              </ButtonSecondary>
            )}
            <ButtonSecondary type="submit">
              {isLastStep ? "Daftar" : "Selanjutnya"}
            </ButtonSecondary>
          </div>
        </div>
      </form>
    </>
  );
}
