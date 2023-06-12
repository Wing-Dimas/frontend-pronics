"use client";
import Buttons from "@/components/Buttons";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

import bni from "@/assets/bank/bank-bni.png";
import bca from "@/assets/bank/bank-bca.png";
import btn from "@/assets/bank/bank-btn.png";
import Image from "next/image";

const MySwal = withReactContent(Swal);

const deafult_list = [
  { id: 1, name: "BNI", logo: bni },
  { id: 2, name: "BTN", logo: btn },
  { id: 3, name: "BCA", logo: bca },
];

export default function Bank() {
  const router = useRouter();

  function handleDelete(e) {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  return (
    <div>
      <h1 className="text-title text-2xl font-semibold">Bank</h1>

      <Buttons
        bgColor="blue"
        onClick={() => router.push("/admin/bank/tambah-bank")}
        className="mt-2"
      >
        Tambah
      </Buttons>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3 w-full">
                Nama Bank
              </th>
              <th scope="col" className="min-w-[200px]"></th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {deafult_list.map((item, i) => (
              <tr
                className={`${i % 2 ? "bg-white" : "bg-gray-200 "} border-b`}
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4">{item.name}</td>
                <td>
                  <Image
                    src={item.logo}
                    width={88}
                    height="auto"
                    alt={item.name}
                  />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Buttons
                    bgColor="purple"
                    onClick={() => router.push("/admin/bank/lihat-bank")}
                  >
                    Lihat
                  </Buttons>
                  <Buttons bgColor="red" onClick={() => handleDelete()}>
                    Delete
                  </Buttons>
                  <Buttons
                    bgColor="aqua"
                    onClick={() => router.push("/admin/bank/edit-bank")}
                  >
                    Edit
                  </Buttons>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
