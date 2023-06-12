"use client";
import Buttons from "@/components/Buttons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const deafult_list = [
  { id: 1, jenis_layanan: "AC bocor", harga: 50000 },
  { id: 2, jenis_layanan: "Service AS", harga: 50000 },
];

export default function EditBidang() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [kategori, setKategori] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, kategori);
  }

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
    <div className="bg-white rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <div className="flex gap-10 h-max">
        <Link
          href="/admin/bidang-dan-pelayanan"
          className="flex justify-center items-center text-3xl pt-2 w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
        >
          <i className="fi fi-rr-arrow-small-left"></i>
        </Link>
        <h1 className="text-2xl font-medium"></h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <form onSubmit={handleSubmit}>
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Jenis Layanan
                </th>
                <th scope="col" className="px-6 py-3 w-full">
                  Harga
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
                    {item.jenis_layanan}
                  </th>
                  <td className="px-6 py-4">{item.harga}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Buttons bgColor="red" onClick={() => handleDelete()}>
                      Delete
                    </Buttons>
                    <Buttons
                      bgColor="aqua"
                      onClick={() =>
                        router.push(
                          "/admin/bidang-dan-pelayanan/edit-pelayanan"
                        )
                      }
                    >
                      Edit
                    </Buttons>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className=" border border-text outline-none p-2 rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className=" border border-text outline-none p-2 rounded-lg"
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td className="px-6 py-4">
                  <div className="flex justify-start items-center text-left">
                    <Buttons type="submit" bgColor="blue">
                      Tambah
                    </Buttons>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
