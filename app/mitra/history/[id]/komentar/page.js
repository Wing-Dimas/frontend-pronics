"use client";
import ButtonSecondary from "@/components/ButtonSecondary";
import InputTextarea from "@/components/InputTextarea";
import GenerateStar from "@/utils/generate-star";
import { session } from "@/utils/userAuth";
import { IconArrowLeft } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import userNoImage from "@/assets/user-no-image.png";
import Image from "next/image";

export default function KometarPage({ params }) {
  const route = useRouter();
  const [komentar, setKomentar] = useState({});

  useEffect(() => {
    const getKomentar = async () => {
      const { token } = await session();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/komentar/see/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await res.json();
      setKomentar(data);
    };

    getKomentar();
  }, []);

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
        <div className="py-4 border-b-2 border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={komentar.foto_customer || userNoImage}
              alt="image-catalog"
              loading="lazy"
              className="object-cover rounded-full w-16 h-16"
              priority={false}
            />
            <span className="text-lg font-medium">
              {komentar.nama_customer}
            </span>
          </div>
          <div className="flex gap-8 mt-4">
            <div className="flex gap-2">
              <GenerateStar rating={komentar.rating_given} />
            </div>{" "}
            <span className="text-text">
              {moment().diff(moment(komentar.tanggal), "days")} Hari lalu
            </span>
          </div>
          <div className="mt-4">
            <p className="text-text font-medium">{komentar.komentar}</p>
          </div>
        </div>
      </section>
    </>
  );
}
