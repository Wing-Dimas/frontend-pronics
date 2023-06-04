"use client";
import React from "react";

export default function About() {
  return (
    <section className="container min-w-full mt-28">
      <div className="flex justify-center items-center gap-24 w-full">
        <span className="block bg-secondary bottom-2 w-36 h-1"></span>
        <h2 className="text-4xl font-bold uppercase">About US</h2>
        <span className="block bg-secondary bottom-2 w-36 h-1"></span>
      </div>
      <p className="mt-16 text-text text-3xl font-normal text-justify w-full">
        Pronics adalah aplikasi penyedia layanan service peralatan rumah tangga
        dengan cepat dan murah dengan cara menjadi penghubung antara customer
        dan penyedia jasa perbaikan barang. Pronics hadir sebagi solusi atas
        seringnya masyarakat mengalami kesulitan dalam memperbaiki peralatan
        rumah tangga baik itu karena kesibukan, kesulitan akses menuju tempat
        service, kurangnya informasi, dan sebagainya. Kami hadir sebagai solusi
        praktis untuk mengatasi masalah tersebut. Tunggu apalagi? Mari gunakan
        Pronics sekarang!
      </p>
    </section>
  );
}
