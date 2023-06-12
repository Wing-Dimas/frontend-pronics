import React from "react";

export default function Mitra() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Toko
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Pemilik
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              No. HP
            </th>
            <th scope="col" className="px-6 py-3">
              Transaksi Selsai
            </th>
            <th scope="col" className="px-6 py-3">
              Status
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
            <td className="px-6 py-4">Madurasa</td>
            <td className="px-6 py-4">Joko</td>
            <td className="px-6 py-4">madurasa@gmail.com</td>
            <td className="px-6 py-4">0811212323</td>
            <td className="px-6 py-4">selesai</td>
            <td className="px-6 py-4">status</td>
          </tr>
          <tr className="border-b bg-gray-200 ">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              2
            </th>
            <td className="px-6 py-4">dprox</td>
            <td className="px-6 py-4">Ayu</td>
            <td className="px-6 py-4">dprox@gmail.com</td>
            <td className="px-6 py-4">0811212323</td>
            <td className="px-6 py-4">selesai</td>
            <td className="px-6 py-4">status</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
