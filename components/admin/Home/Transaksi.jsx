import React from "react";

export default function Transaksi() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              ID Transaksi
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Customer
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Mitra
            </th>
            <th scope="col" className="px-6 py-3">
              Jenis Transaksi
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Nominal
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              1
            </th>
            <td className="px-6 py-4">IDR-76789</td>
            <td className="px-6 py-4">wing</td>
            <td className="px-6 py-4">madurasa</td>
            <td className="px-6 py-4">tunai</td>
            <td className="px-6 py-4">lunas</td>
            <td className="px-6 py-4">Rp 120.000,00</td>
          </tr>
          <tr className="border-b bg-gray-200 ">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              2
            </th>
            <td className="px-6 py-4">IDR-67821</td>
            <td className="px-6 py-4">masmudi</td>
            <td className="px-6 py-4">dprox</td>
            <td className="px-6 py-4">cicilan</td>
            <td className="px-6 py-4">berlangsung</td>
            <td className="px-6 py-4">Rp 90.000,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
