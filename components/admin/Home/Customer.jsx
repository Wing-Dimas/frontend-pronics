import React from "react";

export default function Customer() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Nama
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              No. Handphone
            </th>
            <th scope="col" className="px-6 py-3">
              Jumlah Transaksi
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
            <td className="px-6 py-4">Dimas Wing Bagas</td>
            <td className="px-6 py-4">wingdimas@gmail.com</td>
            <td className="px-6 py-4">081259967123</td>
            <td className="px-6 py-4">Rp. 120.000,00</td>
          </tr>
          <tr className="border-b bg-gray-200 ">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
            >
              2
            </th>
            <td className="px-6 py-4">Masmudi</td>
            <td className="px-6 py-4">masmudi@gmail.com</td>
            <td className="px-6 py-4">081259967125</td>
            <td className="px-6 py-4">RP. 90.000,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
