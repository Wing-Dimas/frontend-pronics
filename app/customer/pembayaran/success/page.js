"use client";
import ButtonSecondary from "@/components/ButtonSecondary";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function PembayaranSuccess() {
  const route = useRouter();
  return (
    <div className="container mx-auto mt-4 rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <section className="flex gap-10 h-max">
        <Link
          className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
          href="/customer"
        >
          <IconArrowLeft />
        </Link>
        <h1 className="text-2xl font-medium">Order to Paryanto Service </h1>
      </section>

      <section className="mx-16 mt-12">
        <p className="text-text font-semibold">
          Selamat order Anda selesai. Sillahkan menunggu dan cek history secara
          berkala.
        </p>

        <div className="flex justify-end">
          <ButtonSecondary onClick={() => route.push("/customer")}>
            Selesai
          </ButtonSecondary>
        </div>
      </section>
    </div>
  );
}
