"use client";
import ButtonSecondary from "@/components/ButtonSecondary";
import InputTextarea from "@/components/InputTextarea";
import GenerateStar from "@/utils/generate-star";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function KometarPage() {
  const route = useRouter();
  return (
    <>
      <section className="flex gap-10 h-max mt-4 mx-16">
        <button
          className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
          onClick={() => route.back()}
        >
          <IconArrowLeft />
        </button>
        <h1 className="text-2xl font-medium">Berikan Komentar Anda</h1>
      </section>

      <section className="mx-16 mt-12">
        <p className="text-text">Beri Rating</p>

        <div className="flex gap-2">
          <GenerateStar rating={5} />
        </div>

        <p className="text-text">Komentar</p>

        <InputTextarea
          placeholder="tulis kometar anda"
          className="max-w-xl"
        ></InputTextarea>

        <div className="flex justify-end max-w-xl">
          <ButtonSecondary>Simpan</ButtonSecondary>
        </div>
      </section>
    </>
  );
}
