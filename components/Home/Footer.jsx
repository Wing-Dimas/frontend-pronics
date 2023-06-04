"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <section className="container mt-32 min-w-full">
      {/* SOSMED */}
      <div className="flex justify-end items-center gap-4">
        <div className="flex gap-4 text-text">
          <Link href="" as="a">
            Kebijakan Privasi
          </Link>
          <Link href="" as="a">
            Syarat Pengguna
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            href=""
            className="flex justify-center items-center bg-secondary rounded-full w-11 h-11"
          >
            <i className="fi fi-brands-facebook text-white text-2xl mt-2"></i>
          </Link>
          <Link
            href=""
            className="flex justify-center items-center bg-secondary rounded-full w-11 h-11"
          >
            <i className="fi fi-brands-twitter text-white text-2xl mt-2"></i>
          </Link>
          <Link
            href=""
            className="flex justify-center items-center bg-secondary rounded-full w-11 h-11"
          >
            <i className="fi fi-rr-envelope text-white text-2xl mt-2"></i>
          </Link>
        </div>
      </div>

      {/* ICON */}
      <div>
        <Image
          src="/assets/img/logo_pronics.png"
          width={274}
          height={89}
          alt="logo_pronics"
          placeholder="blur"
          blurDataURL={"/assets/img/logo_pronics.png"}
          priority={false}
        />
      </div>

      <footer className="mt-8 text-center py-8">
        <p className="font-medium">
          <span className="text-text">Copyright 2023</span> PRONICS
        </p>
      </footer>
    </section>
  );
}
