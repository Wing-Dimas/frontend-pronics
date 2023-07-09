"use client";
import React, { useState } from "react";
import useMultiStepForm from "@/utils/multi-part-steps/useMultiStepForm";
import "@/styles/FormRegisterMitra.css";
import ProfileForm from "./ProfileForm";
import ButtonSecondary from "@/components/ButtonSecondary";
import AddressAndServiceForm from "./AddressAndServiceForm";
import BankForm from "./BankForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import axios from "axios";

const MySwal = withReactContent(Swal);

const INITIAL_DATA = {
  type: "",
  nama: "",
  nama_toko: "",
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
  e_ktp: "",
};

export default function FormRegisterMitra({
  dataWilayah,
  dataKategoriDanBidang,
  dataBank,
}) {
  const [data, setData] = useState(INITIAL_DATA);
  const route = useRouter();

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <ProfileForm {...data} updateFields={updateFields} />,
    <AddressAndServiceForm
      {...data}
      updateFields={updateFields}
      dataWilayah={dataWilayah}
      dataKategoriDanBidang={dataKategoriDanBidang}
    />,
    <BankForm {...data} updateFields={updateFields} dataBank={dataBank} />,
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();

    const bidang = [
      ...data.servicesElektronik,
      ...data.servicesOtomotif,
      ...data.servicesPeralatan,
    ];

    const formData = new FormData();

    formData.append("nama_lengkap", data.nama);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("nama_toko", data.nama_toko);
    formData.append("no_telepon", data.handphone);
    formData.append("deskripsi", data.deskripsiDiri);
    formData.append("type", "mitra");
    formData.append("alamat", data.alamat);
    formData.append("type_mitra", data.type);
    formData.append("wilayah", data.wilayah);
    formData.append("bidang", JSON.stringify(bidang));
    formData.append("id_bank", data.bank);
    formData.append("nama_pemilik_rekening", data.nasabah);
    formData.append("nomer_rekening", data.norek);
    formData.append("e_ktp", data.e_ktp);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/user/registerMitra`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await res.json();
    if (result?.meta?.code === 200) {
      MySwal.fire({
        title: result.meta.message,
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          return route.push("auth/login");
        }
      });
    } else {
      MySwal.fire({
        title: result.meta.message,
        text: result.data,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
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
