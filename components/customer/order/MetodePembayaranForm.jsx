import { toRupiah } from "@/utils/convert";
import useNavigate from "@/utils/dashboard/useNavigate";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import Dropzone from "@/components/Dropzone";
import ButtonSecondary from "@/components/ButtonSecondary";

const BankTransfer = () => {
  return (
    <div>
      <p className="flex justify-between w-96">
        <span className="font-medium text-text">Nama Pemilik</span>
        <span className="font-medium">Aurel</span>
      </p>
      <p className="flex justify-between w-96">
        <span className="font-medium text-text">Nama Bank</span>
        <span className="font-medium">BCA</span>
      </p>
      <p className="flex justify-between w-96">
        <span className="font-medium text-text">Nomor Rekening</span>
        <span className="font-medium">088129889123</span>
      </p>
      <p className="flex justify-between w-96 mb-4">
        <span className="font-medium text-text">Total Bayar</span>
        <span className="font-medium">{toRupiah(60500)}</span>
      </p>
      <Dropzone>Upload bukti Bayar</Dropzone>

      <div className="flex justify-end">
        <ButtonSecondary type="submit">Selesai</ButtonSecondary>
      </div>
    </div>
  );
};

const BayarOtomatis = () => {
  return <div>bayar ototmais</div>;
};
const Cash = () => {
  return (
    <>
      <p className="flex justify-between w-96">
        <span className="font-medium text-text">
          Total yang harus anda bayar
        </span>
        <span className="font-medium">{toRupiah(60500)}</span>
      </p>

      <p className="text-yellow-400">
        Anda bisa melihat pembayaran pada history
      </p>
    </>
  );
};

const pages = [
  { name: "Bank Transfer", element: <BankTransfer /> },
  {
    name: "Bayar Otomatis",
    element: <BayarOtomatis />,
  },
  {
    name: "Cash",
    element: <Cash />,
  },
];

export default function MetodePembayaranForm({
  metodePembayaran,
  updateFields,
  back,
}) {
  const { currentNavigate, page, toPage } = useNavigate(pages);
  return (
    <div className="container mx-auto mt-4 rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <section className="flex gap-10 h-max">
        <button
          className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
          onClick={back}
        >
          <IconArrowLeft />
        </button>
        <h1 className="text-2xl font-medium">Order to Paryanto Service </h1>
      </section>
      <section className="mx-16 mt-12">
        <p className="text-text">pilih metode pembayaran</p>
        <div className="flex justify-between gap-4 mb-8">
          <Button
            className="flex-1"
            onClick={() => toPage("Bank Transfer")}
            active={currentNavigate == "Bank Transfer"}
          >
            Bank Transfer
          </Button>
          <span className="w-[2px] h-11 bg-slate-200"></span>
          <Button
            className="flex-1"
            onClick={() => toPage("Bayar Otomatis")}
            active={currentNavigate == "Bayar Otomatis"}
          >
            Bayar Otomatis
          </Button>
          <span className="w-[2px] h-11 bg-slate-200"></span>
          <Button
            className="flex-1"
            onClick={() => toPage("Cash")}
            active={currentNavigate == "Cash"}
          >
            Cash
          </Button>
        </div>

        {page.element}
      </section>
    </div>
  );
}

function Button({ className, onClick, children, active, type = "button" }) {
  return (
    <button
      onClick={onClick}
      className={`text-2xl font-medium rounded-lg py-2 transition-all duration-150  ${
        active ? "bg-secondary text-white" : "text-text hover:bg-slate-200"
      } ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}
