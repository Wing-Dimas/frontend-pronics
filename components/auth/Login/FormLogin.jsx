"use client";
import Image from "next/image";
import React, { useState } from "react";
import illustrasi from "@/assets/illustration-characters-fixing-cogwheel_53876-40796 1.png";
import logo_google from "@/assets/logo_google.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (result.data?.user) {
      const user = result.data.user;
      const tipe = user.tipe;

      if (tipe === "mitra") {
        route.push("/mitra");
      } else if (tipe === "admin") {
        route.push("/admin");
      } else {
        route.push("/customer");
      }
    }
  };

  return (
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
        <h1 className="text-center text-4xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="text-text text-2xl font-medium">
              Email atau Username
            </label>
            <input
              type="text"
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
            Login
          </button>
        </form>

        <p className="text-center text-text text-xl font-medium mt-4">
          Belum memiliki akun?{" "}
          <Link href={"/auth/register"} className="text-secondary underline">
            Daftar
          </Link>
        </p>

        <div className="flex justify-center items-center gap-8 text-text mt-6">
          <span className="flex-1 block bg-[#BABABA] bottom-2 w-36 h-[1px]"></span>
          <span className="text-xl">atau</span>
          <span className="flex-1 block bg-[#BABABA] bottom-2 w-36 h-[1px]"></span>
        </div>

        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/user/login/google`}
          className="flex justify-center items-center gap-3 border border-secondary rounded-lg text-secondary font-bold py-2 mt-4 w-full"
        >
          <Image src={logo_google} width={35} height={35} alt="logo_google" />
          <span>Masuk dengan Google</span>
        </Link>
      </div>
    </div>
  );
}
