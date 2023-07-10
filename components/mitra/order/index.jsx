"use client";
import ButtonSecondary from "@/components/ButtonSecondary";
import Buttons from "@/components/Buttons";
import { toRupiah } from "@/utils/convert";
import { session } from "@/utils/userAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DEFAULT_HISTORY = [
  {
    id: 1,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "proses",
  },
  {
    id: 3,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "selesai",
  },
  {
    id: 4,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "menunggu",
  },
  {
    id: 5,
    name: "sinta",
    layanan: "AC Rusak",
    alamat: "Jln. Gang delima, Jagakarsa, Jakarta Selatan",
    totalBayar: 12000,
    status: "pesanan masuk",
  },
];

export default function Order() {
  const [kateogri, setKategori] = useState("semua");
  const [orderHistory, setOrderHistory] = useState([]);
  const route = useRouter();

  async function updateOrder(status, id) {
    const { token } = await session();
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/order/updateStatus/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    route.refresh();
  }

  function handleTolak(id, e) {
    MySwal.fire({
      title: "Apakah Anda yakin menolak pesanan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Menolak", "Anda berhasil menolak pesanan", "success");
        updateOrder("ditolak", id);
      }
    });
  }
  function handleTerima(id, e) {
    MySwal.fire({
      title: "Apakah Anda yakin ingin menerima pesanan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Menerima", "Anda berhasil menerima pesanan", "success");
        updateOrder("diterima", id);
      }
    });
  }

  useEffect(() => {
    const getOrder = async () => {
      const { token } = await session();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/order/getByMitra?status=semua`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await res.json();
      setOrderHistory(data);
    };
    getOrder();
  }, []);

  return (
    <>
      <h1 className="text-title text-2xl font-semibold">History</h1>

      <div className="flex gap-3 mt-4">
        <ButtonSecondary
          className={kateogri === "semua" && "bg-secondary text-white"}
          onClick={() => setKategori("semua")}
        >
          Semua
        </ButtonSecondary>
        <ButtonSecondary
          className={kateogri === "menunggu" && "bg-secondary text-white"}
          onClick={() => setKategori("menunggu")}
        >
          Menunggu
        </ButtonSecondary>
        <ButtonSecondary
          className={kateogri === "proses" && "bg-secondary text-white"}
          onClick={() => setKategori("proses")}
        >
          Proses
        </ButtonSecondary>
        <ButtonSecondary
          className={kateogri === "selesai" && "bg-secondary text-white"}
          onClick={() => setKategori("selesai")}
        >
          Selesai
        </ButtonSecondary>
      </div>

      <div className="grid gap-8 mt-4">
        {orderHistory
          .filter((item) => kateogri === "semua" || item.status === kateogri)
          .map((item) => (
            <div className="border border-text p-4" key={item.id}>
              <div className="flex justify-between">
                <p className="text-xl font-semibold">
                  {item.customer.user_data.nama_lengkap}
                </p>
                <p className="capitalize">{item.status}</p>
              </div>
              <div className="mt-4">
                <p className="text-text">
                  {item.order_detail.layanan.nama_layanan}
                </p>
                <p className="mt-1">{item.order_detail.alamat_pesanan}</p>
              </div>

              <div className="flex justify-between items-end">
                <p>
                  Total Bayar :{" "}
                  <span className="font-semibold text-text">
                    {toRupiah(item.order_detail.order_payment.total_biaya)}
                  </span>
                </p>

                <div className="flex gap-3">
                  <Buttons
                    bgColor="purple"
                    onClick={() => route.push(`/mitra/order/${item.id}/detail`)}
                  >
                    Detail
                  </Buttons>
                  <Buttons
                    bgColor="red"
                    onClick={handleTolak.bind(this, item.id)}
                  >
                    Tolak
                  </Buttons>
                  <Buttons
                    bgColor="green"
                    onClick={handleTerima.bind(this, item.id)}
                  >
                    Terima
                  </Buttons>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
