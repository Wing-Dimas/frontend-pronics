"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import userNoImage from "@/assets/user-no-image.png";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { IconUserEdit } from "@tabler/icons-react";
import moment from "moment";
import { session } from "@/utils/userAuth";

const INITAL_DATA = {
  nama: "",
  username: "",
  email: "",
  noHp: "",
  bio: "",
  jenisKelamin: "",
  tglLahir: "",
  foto: "",
};

export default function SettingsCustomer() {
  const [data, setData] = useState(INITAL_DATA);
  const [alamat, setAlamat] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { token } = await session();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/customer/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await res.json();

      setData({
        nama: data?.user_data.nama_lengkap,
        username: data?.username,
        email: data?.user_data.email,
        noHp: data?.user_data.no_telepon,
        bio: data?.user_data.bio,
        jenisKelamin: data?.user_data.jenis_kelamin,
        tglLahir: data?.user_data.tanggal_lahir,
        foto: data?.gambar_user,
      });

      setAlamat(data?.alamat);
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <div className="flex gap-10 h-max">
        <Link
          href="/customer"
          className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
        >
          <IconArrowLeft />
        </Link>
        <h1 className="text-2xl font-medium">Profile</h1>
      </div>

      <div className="mx-16 mt-12">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {data.foto ? (
              <img
                src={data.foto}
                alt="user-image"
                className="w-[60px] h-60px object-cover"
              />
            ) : (
              <Image
                src={userNoImage}
                width={60}
                height={60}
                alt="image-profile"
              />
            )}

            <div className="grid gap-2">
              <p className="font-bold">{data.nama}</p>
              <p className="text-text">{data.noHp}</p>
            </div>
          </div>
          <Link
            href="/customer/settings/profile"
            className="flex justify-center items-center w-12 h-12 rounded-full bg-[rgba(141,189,255,0.15)]"
          >
            <IconUserEdit className="text-xl" />
          </Link>
        </div>

        {/* INFO PROFILE */}
        <h2 className="font-bold mt-8">Info Profile</h2>
        <p className="w-96">
          <span className="text-text inline-block w-32">Username</span>
          <span className="font-medium inline-block">: {data.username}</span>
        </p>
        <p className="w-96">
          <span className="text-text inline-block w-32">Email</span>
          <span className="font-medium inline-block">: {data.email}</span>
        </p>
        <p className="w-96">
          <span className="text-text inline-block w-32">Deskripsi Toko</span>
          <span className="font-medium inline-block">: {data.bio}</span>
        </p>

        {/* Info Pribadi */}
        <h2 className="font-bold mt-8">Info Pribadi</h2>
        <p className="w-96">
          <span className="text-text inline-block w-32">Jenis Kelamin</span>
          <span className="font-medium inline-block">
            : {data.jenisKelamin}
          </span>
        </p>
        <p className="w-96">
          <span className="text-text inline-block w-32">Tanggal Lahir</span>
          <span className="font-medium inline-block">
            : {moment(data.tglLahir).locale("ID").format("LL")}
          </span>
        </p>

        {/* Uabah Kata Sandi */}
        <p className="mt-4">
          <Link href="" className="text-secondary font-semibold">
            Ubah Kata Sandi
          </Link>
        </p>
        <p>
          <Link href="" className="text-secondary font-semibold">
            Informasi Rekening
          </Link>
        </p>

        {/* ALAMAT */}
        <h2 className="font-bold mt-4">Daftar Alamat</h2>
        <ul>
          {alamat ? (
            alamat.map((item) => (
              <li
                className="flex justify-between items-start py-4 border-b last:border-b-slate-300"
                key={item.id}
              >
                <span className="text-text">{item.alamat}</span>
                {item.is_utama && (
                  <span className="font-bold text-secondary">Utama</span>
                )}
              </li>
            ))
          ) : (
            <p>Anda belum pernah menambahkan alamat</p>
          )}
        </ul>
      </div>
    </div>
  );
}
