"use client";
import Buttons from "@/components/Buttons";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

const deafult_list = [
  { id: 1, name: "AC" },
  { id: 2, name: "TV" },
  { id: 3, name: "Handphone" },
];

export default function BidangDanPelayanan() {
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
      <h1 className="text-title text-2xl font-semibold">
        Bidang dan Pelayanan
      </h1>

      <Buttons
        bgColor="blue"
        onClick={() => router.push("/admin/bidang-dan-pelayanan/tambah-bidang")}
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
                Nama Bidang
              </th>
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
                <td className="px-6 py-4 flex gap-2">
                  <Buttons
                    bgColor="purple"
                    onClick={() =>
                      router.push("/admin/bidang-dan-pelayanan/lihat-bidang")
                    }
                  >
                    Lihat
                  </Buttons>
                  <Buttons bgColor="red" onClick={() => handleDelete()}>
                    Delete
                  </Buttons>
                  <Buttons
                    bgColor="aqua"
                    onClick={() =>
                      router.push("/admin/bidang-dan-pelayanan/edit-bidang")
                    }
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
