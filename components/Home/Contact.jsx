"use client";
import React, { useState } from "react";

export default function Contact({ contactRef }) {
  const [nama, setNama] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  return (
    <section className="container mt-28 min-w-full" ref={contactRef}>
      <div className="flex justify-center items-center gap-24 w-full">
        <span className="block bg-secondary bottom-2 w-36 h-1"></span>
        <h2 className="text-4xl font-bold uppercase">Contact US</h2>
        <span className="block bg-secondary bottom-2 w-36 h-1"></span>
      </div>

      {/* FORM */}
      <form
        className="flex flex-col items-center gap-8 mt-20 w-full"
        onSubmit={() => {}}
      >
        <div className="flex items-center flex-col px-6 gap-7 w-full">
          <input
            type="text"
            className="flex-1 border border-text placeholder:text-text text-2xl text-center text-text px-2 py-4 font-medium outline-none min-w-[100px] max-w-[600px] w-full"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <input
            type="text"
            className="flex-1 border border-text placeholder:text-text text-2xl text-center text-text px-2 py-4 font-medium outline-none min-w-[100px] max-w-[600px] w-full"
            placeholder="No. Handphone"
            value={nohp}
            onChange={(e) => setNohp(e.target.value)}
          />
          <input
            type="text"
            className="flex-1 border border-text placeholder:text-text text-2xl text-center text-text px-2 py-4 font-medium outline-none min-w-[100px] max-w-[600px] w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="flex-1 border border-text placeholder:text-text text-2xl text-center text-text px-2 py-4 font-medium outline-none min-w-[100px] max-w-[600px] w-full"
            placeholder="Pesan"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
          />
        </div>

        <button
          className="bg-secondary text-3xl text-white font-bold py-2 px-14 rounded-3xl"
          type="submit"
        >
          Kirim
        </button>
      </form>
    </section>
  );
}
