"use client";
import Image from "next/image";
import React, { useState } from "react";
import illustrasi from "@/assets/illustration-characters-fixing-cogwheel_53876-40796 1.png";
import logo_google from "@/assets/logo_google.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

export default function FormRegister() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const route = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      nama_lengkap: nama,
      email: email,
      password: password,
      type: "customer",
    };

    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.meta.code === 200) {
          MySwal.fire({
            title: res.meta.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              return route.push("auth/login");
            }
          });
        } else {
          MySwal.fire({
            title: res.meta.message,
            text: res.data,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
    setEmail("");
  };

  return (
    <>
      <Link
        href={"/auth/register-mitra"}
        className="flex justify-center items-center px-8 py-2 text-xl text-white font-bold bg-secondary w-max rounded-lg"
      >
        <span>Daftar Sebagai Mitra</span>
      </Link>

      <div className="flex justify-center lg:justify-between">
        <div className="hidden lg:block">
          <Image
            src={illustrasi}
            width={485}
            height={485}
            alt="logo_pronics"
            placeholder="blur"
            blurDataURL={"/assets/img/logo_pronics.png"}
            priority={true}
            className="mx-auto mt-10"
          />
          <p className="text-3xl font-medium text-center mt-4">
            <span className="text-text">
              Temukan solusi dari barang-barang rumah Anda
            </span>
            <br /> Dengan Pronics, semua dapat diperbaiki
          </p>
        </div>

        <div className="shadow-2xl rounded-lg flex-1 max-w-lg p-8 mt-8">
          <h1 className="text-center text-4xl font-bold">Daftar Sekarang</h1>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-4">
              <label htmlFor="nama" className="text-text text-2xl font-medium">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="border-text border rounded-lg py-2 px-4"
                required
              />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <label htmlFor="email" className="text-text text-2xl font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-text border rounded-lg py-2 px-4"
                required
              />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <label
                htmlFor="password"
                className="text-text text-2xl font-medium"
              >
                Password
              </label>
              <div className="relative w-full text-end">
                <input
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-text border rounded-lg py-2 pl-4 pr-12 w-full"
                  required
                />
                <Link href={""} className="text-text text-lg font-medium ">
                  Lupa Password
                </Link>
                <button
                  type="button"
                  className="absolute right-4 top-2"
                  onClick={() => setIsShowPassword((prev) => !prev)}
                >
                  {!isShowPassword ? (
                    <i className="fi fi-rr-eye-crossed text-2xl"></i>
                  ) : (
                    <i className="fi fi-rr-eye text-2xl"></i>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 bg-[#F1F3F4] w-full rounded-lg text-2xl font-bold mt-3"
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-text text-xl font-medium mt-4">
            Sudah Memiliki Akun?{" "}
            <Link href={"/auth/login"} className="text-secondary underline">
              Login
            </Link>
          </p>

          <div className="flex justify-center items-center gap-8 text-text mt-6">
            <span className="flex-1 block bg-[#BABABA] bottom-2 w-36 h-[1px]"></span>
            <span className="text-xl">atau</span>
            <span className="flex-1 block bg-[#BABABA] bottom-2 w-36 h-[1px]"></span>
          </div>

          <Link
            href={""}
            className="flex justify-center items-center gap-3 border border-secondary rounded-lg text-secondary font-bold py-2 mt-4"
          >
            <Image src={logo_google} width={35} height={35} alt="logo_google" />
            <span>Daftar dengan Google</span>
          </Link>
        </div>
      </div>
    </>
  );
}
