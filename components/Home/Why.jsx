"use client";
import Image from "next/image";
import React from "react";

export default function Why({ whyRef }) {
  return (
    <section className="container mt-28 min-w-full" ref={whyRef}>
      <div className="flex justify-center items-center gap-24 w-full">
        <span className="block bg-secondary bottom-2 w-36 h-1"></span>
        <h2 className="text-4xl font-bold uppercase">Why US?</h2>
        <span className="block bg-secondary bottom-2 w-36 h-1"></span>
      </div>

      {/* CARD LIST */}
      <div className="flex flex-wrap gap-8 mt-28 justify-between w-full">
        <div className="card mx-auto bg-secondary flex flex-1 flex-col justify-center items-center p-10 rounded-xl min-w-[350px] max-w-[366px] ">
          <div className="flex justify-center items-center w-[173px] h-[173px] bg-white rounded-full">
            <Image
              src="/assets/img/save-money.png"
              width={100}
              height={100}
              alt="save-money"
              placeholder="blur"
              blurDataURL={"/assets/img/save-money.png"}
              priority={true}
              className="object-cover"
            />
          </div>
          <p className="text-center text-3xl text-white font-medium mt-6">
            Mudah digunakan, aman, dan murah
          </p>
        </div>
        <div className="card mx-auto bg-white flex flex-1 flex-col justify-center items-center p-10 rounded-xl min-w-[350px] max-w-[366px] ">
          <div className="flex justify-center items-center w-[173px] h-[173px] bg-secondary rounded-full">
            <Image
              src="/assets/img/fast-delivery.png"
              width={100}
              height={100}
              alt="fast-delivery"
              placeholder="blur"
              blurDataURL={"/assets/img/fast-delivery.png"}
              priority={true}
              className="object-cover"
            />
          </div>
          <p className="text-center text-2xl text-text font-medium mt-6">
            Panggil tukang ke rumah atau menggunakan fitur take & delivery
          </p>
        </div>
        <div className="card mx-auto bg-secondary flex flex-1 flex-col justify-center items-center p-10 rounded-xl min-w-[350px] max-w-[366px] ">
          <div className="flex justify-center items-center w-[173px] h-[173px] bg-white rounded-full">
            <Image
              src="/assets/img/customer-service.png"
              width={100}
              height={100}
              alt="customer-service"
              placeholder="blur"
              blurDataURL={"/assets/img/customer-service.png"}
              priority={true}
              className="object-cover"
            />
          </div>
          <p className="text-center text-3xl text-white font-medium mt-6">
            Banyak pilihan jenis barang dan perbaikan
          </p>
        </div>
      </div>
    </section>
  );
}
