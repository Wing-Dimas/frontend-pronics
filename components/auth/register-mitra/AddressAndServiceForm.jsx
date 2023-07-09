import InputCheckbox from "@/components/InputCheckbox";
import RadioButton from "@/components/RadioButton";
import React, { useEffect, useState } from "react";

const DEFAULT_ELEKTRONIK = [
  "Televisi",
  "Handphone",
  "Laptop/Komputer",
  "CCTV",
  "Kulkas",
  "Mesin Cuci",
  "Kipas Angin",
  "AC",
];

const DEFAULT_OTOMOTIF = ["Mobil", "Motor", "Sepeda"];

const DEFAULT_PERALATAN = [
  "Kelistrikan Rumah",
  "Genset",
  "Pompa air, Toilet",
  "Peralatan Dapur",
  "Perbaikan Rumah",
];

export default function AddressAndServiceForm({
  wilayah,
  servicesElektronik,
  servicesOtomotif,
  servicesPeralatan,
  updateFields,
  dataWilayah,
  dataKategoriDanBidang,
}) {
  const [dataElektronik, setDataElektronik] = useState({});
  const [dataPeralatan, setDataPeralatan] = useState({});
  const [dataOtomotif, setDataOtomotif] = useState({});

  useEffect(() => {
    setDataElektronik(
      dataKategoriDanBidang.data.filter(
        (item) => item.nama_kategori === "elektronik"
      )[0]
    );
    setDataPeralatan(
      dataKategoriDanBidang.data.filter(
        (item) => item.nama_kategori === "peralatan rumah"
      )[0]
    );
    setDataOtomotif(
      dataKategoriDanBidang.data.filter(
        (item) => item.nama_kategori === "otomotif dan kendaraan"
      )[0]
    );

    return;
  });

  function handleCheckboxEletronik(e) {
    const { value, checked } = e.target;

    if (checked) {
      updateFields({ servicesElektronik: [...servicesElektronik, value] });
    } else {
      updateFields({
        servicesElektronik: servicesElektronik.filter(
          (service) => service !== value
        ),
      });
    }
  }

  function handleCheckboxOtomotif(e) {
    const { value, checked } = e.target;

    if (checked) {
      updateFields({ servicesOtomotif: [...servicesOtomotif, value] });
    } else {
      updateFields({
        servicesOtomotif: servicesOtomotif.filter(
          (service) => service !== value
        ),
      });
    }
  }

  function handleCheckboxPeralatan(e) {
    const { value, checked } = e.target;

    if (checked) {
      updateFields({ servicesPeralatan: [...servicesPeralatan, value] });
    } else {
      updateFields({
        servicesPeralatan: servicesPeralatan.filter(
          (service) => service !== value
        ),
      });
    }
  }

  return (
    <>
      {/* WILAYAH */}
      <div className="mt-8">
        <h2 className="text-[#444] text-2xl font-medium mb-2">
          Wilayah Cakupan
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-x-8 gap-y-4">
          {dataWilayah.data.map((item) => (
            <RadioButton
              name="wilayah"
              value={item.id}
              text={item.nama_wilayah}
              checked={item.id === wilayah}
              onChange={(e) => {
                updateFields({ wilayah: e.target.value });
              }}
              key={item.id}
            />
          ))}
        </div>
      </div>

      {/* BIDANG PELAYANAN */}
      <h2 className="text-[#444] text-2xl font-medium mt-7">
        Bidang Pelayanan
      </h2>

      {/* ELEKTRONIK */}
      <div>
        <h2 className=" text-2xl font-medium my-2">Elektronik</h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-x-8 gap-y-4">
          {dataElektronik?.bidang?.map((item) => (
            <InputCheckbox
              name="elektronik"
              value={item.ID}
              text={item.nama_bidang}
              onChange={handleCheckboxEletronik}
              checked={servicesElektronik.includes(item.ID)}
              key={item.ID}
            />
          ))}
        </div>
      </div>

      {/* OTOMOTIF */}

      <div>
        <h2 className=" text-2xl font-medium my-2">Otomotif atau Kendaraan</h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-x-8 gap-y-4">
          {dataOtomotif?.bidang?.map((item) => (
            <InputCheckbox
              name="otomotif"
              value={item.ID}
              text={item.nama_bidang}
              onChange={handleCheckboxOtomotif}
              checked={servicesOtomotif.includes(item.ID)}
              key={item.ID}
            />
          ))}
        </div>
      </div>
      {/* PERALATAN RUMAH */}
      <div>
        <h2 className=" text-2xl font-medium my-2">Peralatan Rumah</h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-x-8 gap-y-4">
          {dataPeralatan?.bidang?.map((item) => (
            <InputCheckbox
              name="peralatan"
              value={item.ID}
              text={item.nama_bidang}
              onChange={handleCheckboxPeralatan}
              checked={servicesPeralatan.includes(item.ID)}
              key={item.ID}
            />
          ))}
        </div>
      </div>
    </>
  );
}
