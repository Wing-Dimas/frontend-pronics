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
        <h1 className="text-2xl font-medium">Komentar Anda</h1>
      </section>

      <section className="mx-16 mt-12">
        <div className="flex gap-8 mt-4">
          <div className="flex gap-2">
            <GenerateStar rating={5} />
          </div>{" "}
          <span className="text-text">2 Hari lalu</span>
        </div>
        <div className="mt-4">
          <p className="text-text font-medium">
            Saya sangat puas dengan pelayanan jasa servis elektronik yang
            diberikan oleh tim profesional ini. Mereka sangat responsif dan
            ramah dalam menanggapi permintaan saya. Teknisi yang datang sangat
            terampil dan berpengetahuan luas tentang perbaikan elektronik.
          </p>
        </div>
      </section>
    </>
  );
}
