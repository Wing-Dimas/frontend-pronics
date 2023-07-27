import ButtonSecondary from "@/components/ButtonSecondary";
import RadioButton from "@/components/RadioButton";
import { toRupiah } from "@/utils/convert";
import { session } from "@/utils/userAuth";
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

const DEFAULT_PELAYANAN = [
  {
    id: 1,
    value: "home calling",
    text: "Layanan ini memungkinkan anda memanggil tukang service ke rumah anda dan akan diperbaiki di tempat. Biayanya akan diakumulasi biaya perbaikan, biaya perjalanan tukang, dan biaya aplikasi.",
  },
  {
    id: 2,
    value: "take & delivery",
    text: "Layanan ini memungkinkan tukang service membawa barang anda (yang tidak memungkinkan diperbaiki di rumah) untuk dibawa ke lokasi tukang service. Anda akan menerima barang yang sudah selesai diperbaiki dan siap pakai. Kami akan memastikan keamanan barang anda. Dengan layanan ini, anda tidak perlu menunggu perbaikan di rumah anda karena barang akan diantarkan ketika sudah selesai diperbaiki. Dengan layanan ini, biaya akan diakumulasi mulai dari biaya perbaikan, biaya pengambilan dan pengantaran barang, serta biaya aplikasi.",
  },
];

export default function PelayananForm({
  merk,
  layanan,
  deskripsi,
  jenisPelayanan,
  updateFields,
  back,
  id,
  order_id,
  order_detail_id,
  next,
}) {
  // const [id_layanan, id_mitra] = id;
  const [kategori, setKategori] = useState(DEFAULT_PELAYANAN[0].value);
  const [data, setData] = useState(null);

  const controller = new AbortController();

  useEffect(() => {
    const getKategori = async () => {
      const { token } = await session();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/orderPayment/createOrUpdate/${order_detail_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jenis_order: kategori }),
          signal: controller.signal,
        }
      );

      const { data } = await res.json();
      // console.log(data);
      setKategori(data.order_detail.jenis_order);
      setData(data);
    };

    getKategori();

    return () => controller.abort();
  }, [kategori]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = await session();
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/orderPayment/createOrUpdate/${order_detail_id}`,
      {
        method: "POST",
        body: JSON.stringify({
          jenis_order: kategori,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        updateFields({
          order_payment_id: res.data.order_detail.order_payment.id,
          total_biaya: res.data.order_detail.order_payment.total_biaya
        });
        if (res.meta.code) {
          next();
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto mt-4 rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
        <section className="flex gap-10 h-max">
          <button
            className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
            onClick={back}
          >
            <IconArrowLeft />
          </button>
          <h1 className="text-2xl font-medium">Order to Paryanto Service </h1>
        </section>

        <section className="mx-16 mt-12">
          <p className="text-text font-semibold">
            Silahkan pilih jenis pelayanan yang anda inginkan :
          </p>

          <div className="grid gap-4 mt-4">
            {DEFAULT_PELAYANAN.map((item) => (
              <div className="flex items-start gap-4" key={item.id}>
                <input
                  type="radio"
                  name="pelayanan"
                  value={item.value}
                  className="flex mt-1"
                  id={item.value}
                  onChange={(e) => setKategori(item.value)}
                  checked={item.value === kategori}
                  required={true}
                />
                <label htmlFor={item.value} className="text-text">
                  <p>{item.value}</p>
                  <p className="mt-2">{item.text}</p>
                </label>
              </div>
            ))}
          </div>

          <div className="ml-7 mt-4">
            <h3 className="font-semibold">Detail Order</h3>

            {/* <p className="text-text">ID Transaksi {orderPayment?.}</p> */}
            <p className="text-text">
              Jenis Layanan : {data?.order_detail.layanan.nama_layanan}
            </p>
            <p className="text-text">Merk {data?.order_detail.merk}</p>
            {/* <p className="text-text">Jenis Perbaikan / Layanan {layanan}</p> */}
            <p className="text-text">Deskripsi Kerusakan : </p>
            <p className="text-text">
              {data?.order_detail.deskripsi_kerusakan}
            </p>

            <h3 className="font-semibold mt-4">Lokasi Tukang</h3>
            <p className="font-semibold">{data?.mitra.alamat}</p>

            <h3 className="font-semibold mt-4">Akumulasi Biaya</h3>
            <p className="flex justify-between w-96">
              <span className="font-medium">Pelayanan yang dipilih</span>
              <span className="text-text">
                {toRupiah(data?.order_detail.order_payment.biaya_pelayanan)}
              </span>
            </p>
            <p className="flex justify-between w-96">
              <span className="font-medium">
                Biaya Perjalanan ({data?.order_detail.order_payment.jarak}km)
              </span>
              <span className="text-text">
                {toRupiah(data?.order_detail.order_payment.biaya_perjalanan)}
              </span>
            </p>
            <p className="flex justify-between w-96">
              <span className="font-medium">Discount</span>
              <span className="text-text">
                {toRupiah(data?.order_detail.order_payment.diskon)}
              </span>
            </p>
            <p className="flex justify-between w-96">
              <span className="font-medium">Biaya Aplikasi</span>
              <span className="text-text">
                {toRupiah(data?.order_detail.order_payment.biaya_aplikasi)}
              </span>
            </p>
            {/* TOTAL */}
            <p className="flex justify-between w-96">
              <span className="font-medium">Total</span>
              <span className="text-text">
                {toRupiah(data?.order_detail.order_payment.total_biaya)}
              </span>
            </p>

            <ButtonSecondary type="submit" className="mt-4">
              Lanjutkan Pembayaran
            </ButtonSecondary>
          </div>
        </section>
      </div>
    </form>
  );
}
