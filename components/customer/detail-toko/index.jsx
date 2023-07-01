"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import userNoImage from "@/assets/user-no-image.png";
import ButtonSecondary from "@/components/ButtonSecondary";
import { IconBookmark, IconMessage } from "@tabler/icons-react";
import { toRupiah } from "@/utils/convert";
import GenerateStar from "@/utils/generate-star";
import { useRouter } from "next/navigation";

const DEFAULT_LAYANAN = [
  { name: "Layanan 1", harga: 50000 },
  { name: "Layanan 2", harga: 50000 },
  { name: "Layanan 3", harga: 50000 },
  { name: "Layanan 4", harga: 50000 },
];

export default function ComponentDetailCustomer() {
  const [ratio, setRatio] = useState(16 / 9);
  const route = useRouter();
  const orderRef = useRef();

  function handleButtonToOrder(e, ref) {
    window.scrollTo({
      top: ref.offsetTop - 98,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="container mx-auto mt-4 pb-12">
      <section className="flex justify-center w-full">
        <Image
          src="/assets/img/image-service.jpg"
          alt="image-catalog"
          width={600}
          height={600 / ratio}
          loading="lazy"
          className="object-cover rounded-xl"
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
          priority={false}
        />
      </section>

      <section className="flex justify-center flex-col items-center gap-6 mt-8 ">
        <Image
          src={userNoImage}
          alt="image-catalog"
          width={135}
          height={135 / ratio}
          loading="lazy"
          className="object-cover rounded-full"
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
          priority={false}
        />

        <h2 className="text-3xl font-semibold">Paryanto Service</h2>
      </section>

      <section className="mt-12 flex justify-between gap-8 flex-wrap sm:flex-nowrap">
        <div className="description text-text text-xl font-normal">
          <p>
            toko servis elektronik yang terkenal dan terpercaya di kota ini.
            Sebagai salah satu penyedia layanan terbaik di industri elektronik,
            Paryanto memiliki reputasi yang kuat dalam menawarkan solusi
            perbaikan elektronik yang handal dan efisien.
          </p>
          <p>
            Bidang utama Paryanto adalah perbaikan dan pemeliharaan berbagai
            jenis perangkat elektronik, termasuk tetapi tidak terbatas pada
            telepon genggam, komputer, laptop, televisi, peralatan audio dan
            video, perangkat rumah tangga, dan banyak lagi. Mereka memiliki
            pengetahuan yang mendalam tentang berbagai merek dan model, termasuk
            perangkat dari produsen terkemuka.
          </p>
        </div>
        <div>
          <div className="flex gap-4 ">
            <button
              className="flex justify-center items-center h-12 rounded-lg bg-blueTransparant text-secondary text-xl px-4 font-medium"
              onClick={(e) => handleButtonToOrder(e, orderRef.current)}
            >
              Order
            </button>
            <button className="flex justify-center items-center w-12 h-12 rounded-lg bg-blueTransparant text-secondary text-xl">
              <IconBookmark />
            </button>
            <button className="flex justify-center items-center w-12 h-12 rounded-lg bg-blueTransparant text-secondary text-xl">
              <IconMessage />
            </button>
          </div>

          <p className=" text-xl font-medium mt-4 ">Keahlian :</p>
          <ul className="list-disc text-text text-lg ml-8">
            <li>Keahlian 1</li>
            <li>Keahlian 2</li>
            <li>Keahlian 3</li>
            <li>Keahlian 4</li>
          </ul>
        </div>
      </section>

      <section className="max-w-2xl mt-12" ref={orderRef}>
        <h3 className="text-xl font-medium">Daftar Layanan</h3>

        <div className="flex flex-col gap-5 mt-8">
          {DEFAULT_LAYANAN.map((item, i) => (
            <div
              className="flex justify-between items-center p-4 border border-slate-500"
              key={i}
            >
              <div className="flex flex-col justify-between gap-2">
                <h4 className="text-lg font-medium">{item.name}</h4>
                <p className="text-text text-base font-semibold">
                  {toRupiah(item.harga)}
                </p>
              </div>
              <ButtonSecondary onClick={() => route.push("/customer/order")}>
                Order
              </ButtonSecondary>
            </div>
          ))}
        </div>
      </section>

      <hr className="h-1 bg-slate-300 my-8" />

      <section>
        <h3 className="text-xl font-medium">Rating dan Komentar</h3>

        <div className="flex gap-6">
          <div className="flex gap-2">
            <GenerateStar rating={5} />
            <span className="ml-6">5.0</span>
          </div>
          <span className="w-[1px] bg-slate-300"></span>
          <span className="text-text">100 rating</span>
          <span className="w-[1px] bg-slate-300"></span>
          <span className="text-text">50 komentar</span>
        </div>

        <div className="grid gap-4 mt-8">
          <div className="py-4 border-b-2 border-gray-200">
            <div className="flex items-center gap-4">
              <Image
                src={userNoImage}
                alt="image-catalog"
                width={60}
                height={60}
                loading="lazy"
                className="object-cover rounded-full"
                priority={false}
              />
              <span className="text-lg font-medium">User</span>
            </div>
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
                ramah dalam menanggapi permintaan saya. Teknisi yang datang
                sangat terampil dan berpengetahuan luas tentang perbaikan
                elektronik.
              </p>
            </div>
          </div>
          <div className="py-4 border-b-2 border-gray-200">
            <div className="flex items-center gap-4">
              <Image
                src={userNoImage}
                alt="image-catalog"
                width={60}
                height={60}
                loading="lazy"
                className="object-cover rounded-full"
                priority={false}
              />
              <span className="text-lg font-medium">User</span>
            </div>
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
                ramah dalam menanggapi permintaan saya. Teknisi yang datang
                sangat terampil dan berpengetahuan luas tentang perbaikan
                elektronik.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
