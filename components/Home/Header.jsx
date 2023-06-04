"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ profileRef, whyRef, contactRef }) {
  const [isActive, setIsActive] = useState("profile");
  const line = useRef();

  function handleButton(e, name, ref) {
    setIsActive(name);
    const width = e.target.clientWidth;
    const offsetX = e.target.offsetLeft;

    line.current.style.width = `${width}px`;
    line.current.style.left = `${offsetX}px`;

    window.scrollTo({
      top: ref.offsetTop - 98,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <header className="container flex justify-between items-center fixed min-w-full h-24 bg-white top-0">
        <div>
          <Image
            src="/assets/img/logo_pronics.png"
            width={274}
            height={89}
            alt="logo_pronics"
            placeholder="blur"
            blurDataURL={"/assets/img/logo_pronics.png"}
            priority={true}
          />
        </div>
        <nav className="navbar p-4 h-full">
          <ul className="navbar-list flex flex-1 justify-between items-center h-full px-14 ">
            <span
              className="block bg-secondary bottom-2 w-7 h-1 absolute transition-all duration-500"
              ref={line}
            ></span>
            <li>
              <button
                className={`font-bold text-2xl ${
                  isActive == "profile" ? "text-secondary" : "text-white"
                }`}
                onClick={(e) => handleButton(e, "profile", profileRef.current)}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className={`font-bold text-2xl ${
                  isActive == "why" ? "text-secondary" : "text-white"
                }`}
                onClick={(e) => handleButton(e, "why", whyRef.current)}
              >
                Why Us
              </button>
            </li>
            <li>
              <button
                className={`font-bold text-2xl ${
                  isActive == "contact" ? "text-secondary" : "text-white"
                }`}
                onClick={(e) => handleButton(e, "contact", contactRef.current)}
              >
                Contact Us
              </button>
            </li>
            <li>
              <Link
                href={""}
                className={`font-bold text-2xl text-white`}
                as="a"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <div
        className="container mt-28 flex justify-between bg-secondary min-w-full gap-36 h-[460px]"
        ref={profileRef}
      >
        <div className="flex flex-col justify-center pb-12 gap-3">
          <h1 className="text-white text-4xl font-bold">PRONICS</h1>
          <p className="text-white text-2xl font-medium ">
            Temukan solusi dari barang-barang rumah Anda Dengan Pronics, semua
            dapat diperbaiki
          </p>
        </div>
        <div className="">
          <Image
            src="/assets/img/people.png"
            width={600}
            height={600}
            alt="people"
            placeholder="blur"
            blurDataURL={"/assets/img/people.png"}
            priority={true}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
