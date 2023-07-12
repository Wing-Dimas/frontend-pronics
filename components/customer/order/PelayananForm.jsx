import ButtonSecondary from "@/components/ButtonSecondary";
import RadioButton from "@/components/RadioButton";
import { toRupiah } from "@/utils/convert";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";

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
  next,
}) {
  const [id_layanan, id_mitra] = id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = await session();
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/orderPayment/createOrUpdate/${order_id}`,
      {
        method: "POST",
        body: JSON.stringify({
          jenis_order: jenisPelayanan,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
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
                  onChange={(e) =>
                    updateFields({ jenisPelayanan: e.target.value })
                  }
                  checked={item.value === jenisPelayanan}
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

            <p className="text-text">ID Transaksi #ge784djOd_sdf343f</p>
            <p className="text-text">Jenis Layanan : Layanan 1</p>
            <p className="text-text">Merk {merk}</p>
            <p className="text-text">Jenis Perbaikan / Layanan {layanan}</p>
            <p className="text-text">Deskripsi Kerusakan : </p>
            <p className="text-text">{deskripsi}</p>

            <h3 className="font-semibold mt-4">Lokasi Tukang</h3>
            <p className="font-semibold">
              Jl. Delima, Tanjung Barat, Jagakarsa, Jaksel 12560.
            </p>

            <h3 className="font-semibold mt-4">Akumulasi Biaya</h3>
            <p className="flex justify-between w-96">
              <span className="font-medium">Pelayanan yang dipilih</span>
              <span className="text-text">{toRupiah(50000)}</span>
            </p>
            <p className="flex justify-between w-96">
              <span className="font-medium">Biaya Perjalanan (4.2km)</span>
              <span className="text-text">{toRupiah(8500)}</span>
            </p>
            <p className="flex justify-between w-96">
              <span className="font-medium">Discount</span>
              <span className="text-text">{toRupiah(0)}</span>
            </p>
            <p className="flex justify-between w-96">
              <span className="font-medium">Biaya Aplikasi</span>
              <span className="text-text">{toRupiah(2000)}</span>
            </p>
            {/* TOTAL */}
            <p className="flex justify-between w-96">
              <span className="font-medium">Total</span>
              <span className="text-text">{toRupiah(60500)}</span>
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
