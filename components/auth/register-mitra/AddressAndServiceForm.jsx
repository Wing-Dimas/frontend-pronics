import InputCheckbox from "@/components/InputCheckbox";
import RadioButton from "@/components/RadioButton";
import React, { useEffect, useState } from "react";

const DEFAULT_WILAYAH = [
  "Jabodetabek",
  "Surabaya",
  "Bandung",
  "Yogyakarta",
  "Medan",
  "Palembang",
  "Balikpapan",
  "Makassar",
  "Bali",
];

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
}) {
  const [elektronik, setElektronik] = useState("");
  const [otomotif, setOtomotif] = useState("");
  const [peralatan, setPeralatan] = useState("");

  const [isInputTextWilayah, setIsInputTextWilayah] = useState(true);
  const [isInputTextElektronik, setIsInputTextElektronik] = useState(true);
  const [isInputTextOtomotif, setIsInputTextOtomotif] = useState(true);
  const [isInputTextPeralatan, setIsInputTextPeralatan] = useState(true);

  useEffect(() => {
    const cekElektronik = () => {
      setIsInputTextElektronik(
        servicesElektronik.filter(
          (service) => !DEFAULT_ELEKTRONIK.includes(service)
        ).length > 0
      );

      !isInputTextElektronik
        ? setIsInputTextElektronik(
            servicesElektronik.filter(
              (service) => !DEFAULT_ELEKTRONIK.includes(service)
            )[0]
          )
        : "";
    };

    const cekOtomotif = () => {
      setIsInputTextOtomotif(
        servicesOtomotif.filter(
          (service) => !DEFAULT_OTOMOTIF.includes(service)
        ).length > 0
      );

      !isInputTextOtomotif
        ? setIsInputTextOtomotif(
            servicesOtomotif.filter(
              (service) => !DEFAULT_OTOMOTIF.includes(service)
            )[0]
          )
        : "";
    };

    const cekPeralatan = () => {
      setIsInputTextPeralatan(
        servicesPeralatan.filter(
          (service) => !DEFAULT_PERALATAN.includes(service)
        ).length > 0
      );

      !isInputTextOtomotif
        ? setIsInputTextPeralatan(
            servicesPeralatan.filter(
              (service) => !DEFAULT_PERALATAN.includes(service)
            )[0]
          )
        : "";
    };

    cekElektronik();
    cekOtomotif();
    cekPeralatan();
  }, []);

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

  function deleteOldValueElektronik(kondisi) {
    if (kondisi) {
      const old = servicesElektronik.filter((item) => item === elektronik)[0];

      const index = servicesElektronik.indexOf(old);

      if (index >= 0) {
        servicesElektronik.pop(index);
        setElektronik("");
        updateFields({ servicesElektronik: servicesElektronik });
      }
    }
  }

  function deleteOldValueOtomotif(kondisi) {
    if (kondisi) {
      const old = servicesOtomotif.filter((item) => item === otomotif)[0];

      const index = servicesOtomotif.indexOf(old);

      if (index >= 0) {
        servicesOtomotif.pop(index);
        setOtomotif("");
        updateFields({ servicesOtomotif: servicesOtomotif });
      }
    }
  }

  function deleteOldValuePeralatan(kondisi) {
    if (kondisi) {
      const old = servicesPeralatan.filter((item) => item === peralatan)[0];

      const index = servicesPeralatan.indexOf(old);

      if (index >= 0) {
        servicesPeralatan.pop(index);
        setPeralatan("");
        updateFields({ servicesPeralatan: servicesPeralatan });
      }
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
          {DEFAULT_WILAYAH.map((item, i) => (
            <RadioButton
              name="item"
              value={item}
              text={item}
              checked={item === wilayah}
              onChange={(e) => {
                updateFields({ wilayah: e.target.value });
                setIsInputTextWilayah(true);
              }}
              key={i}
            />
          ))}
          <div className="flex items-start">
            <RadioButton
              name="wilayah"
              checked={
                !isInputTextWilayah || !DEFAULT_WILAYAH.includes(wilayah)
              }
              onChange={() => {
                updateFields({ wilayah: "" });
                setIsInputTextWilayah(false);
              }}
              className="min-w-max"
            />
            <input
              type="text"
              className="w-full border border-text px-2 py-1 rounded-lg outline-none valid:border-secondary valid:text-secondary disabled:text-text"
              placeholder="Tulis Disini"
              value={!DEFAULT_WILAYAH.includes(wilayah) ? wilayah : ""}
              disabled={isInputTextWilayah && DEFAULT_WILAYAH.includes(wilayah)}
              onChange={(e) => updateFields({ wilayah: e.target.value })}
            />
          </div>
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
          {DEFAULT_ELEKTRONIK.map((elektronik, i) => (
            <InputCheckbox
              name="elektronik"
              value={elektronik}
              text={elektronik}
              onChange={handleCheckboxEletronik}
              checked={servicesElektronik.includes(elektronik)}
              key={i}
            />
          ))}

          <div className="flex items-start">
            <InputCheckbox
              name="elektronik"
              checked={isInputTextElektronik}
              onChange={() => {
                setIsInputTextElektronik((prev) => {
                  deleteOldValueElektronik(prev);
                  return !prev;
                });
              }}
              className="min-w-max"
            />
            <input
              type="text"
              className="w-full border border-text px-2 py-1 rounded-lg outline-none valid:border-secondary valid:text-secondary disabled:text-text"
              placeholder="Tulis Disini"
              value={elektronik}
              disabled={!isInputTextElektronik}
              onChange={(e) => setElektronik(e.target.value)}
              onBlur={() => {
                if (!servicesElektronik.includes(elektronik)) {
                  updateFields({
                    servicesElektronik: [...servicesElektronik, elektronik],
                  });
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* OTOMOTIF */}

      <div>
        <h2 className=" text-2xl font-medium my-2">Otomotif atau Kendaraan</h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-x-8 gap-y-4">
          {DEFAULT_OTOMOTIF.map((otomotif, i) => (
            <InputCheckbox
              name="otomotif"
              value={otomotif}
              text={otomotif}
              onChange={handleCheckboxOtomotif}
              checked={servicesOtomotif.includes(otomotif)}
              key={i}
            />
          ))}

          <div className="flex items-start">
            <InputCheckbox
              name="otomotif"
              onChange={() => {
                setIsInputTextOtomotif((prev) => {
                  deleteOldValueOtomotif(prev);
                  return !prev;
                });
              }}
              className="min-w-max"
            />
            <input
              type="text"
              className="w-full border border-text px-2 py-1 rounded-lg outline-none valid:border-secondary valid:text-secondary disabled:text-text"
              placeholder="Tulis Disini"
              value={otomotif}
              disabled={!isInputTextOtomotif}
              onChange={(e) => setOtomotif(e.target.value)}
              onBlur={() => {
                if (!servicesOtomotif.includes(otomotif)) {
                  updateFields({
                    servicesOtomotif: [...servicesOtomotif, otomotif],
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
      {/* PERALATAN RUMAH */}
      <div>
        <h2 className=" text-2xl font-medium my-2">Peralatan Rumah</h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-x-8 gap-y-4">
          {DEFAULT_PERALATAN.map((peralatan, i) => (
            <InputCheckbox
              name="peralatan"
              value={peralatan}
              text={peralatan}
              onChange={handleCheckboxPeralatan}
              checked={servicesPeralatan.includes(peralatan)}
              key={i}
            />
          ))}

          <div className="flex items-start">
            <InputCheckbox
              name="peralatan"
              onChange={() => {
                setIsInputTextPeralatan((prev) => {
                  deleteOldValuePeralatan(prev);
                  return !prev;
                });
              }}
              className="min-w-max"
            />
            <input
              type="text"
              className="w-full border border-text px-2 py-1 rounded-lg outline-none valid:border-secondary valid:text-secondary disabled:text-text"
              placeholder="Tulis Disini"
              disabled={!isInputTextPeralatan}
              onChange={(e) => setPeralatan(e.target.value)}
              onBlur={() => {
                if (!servicesPeralatan.includes(peralatan)) {
                  updateFields({
                    servicesPeralatan: [...servicesPeralatan, peralatan],
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
