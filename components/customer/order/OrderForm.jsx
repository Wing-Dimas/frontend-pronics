import ButtonSecondary from "@/components/ButtonSecondary";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import Select from "@/components/Select";
import { RadioGroup } from "@headlessui/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DEFAULT_ALAMAT = [
  "jln. Delima, Tanjung Barat, Jagakarsa, Jaksel 12560.",
  "jln. Delima, Tanjung Barat, Jagakarsa, Jaksel.",
  "jln. Delima, Tanjung Barat, Jagakarsa.",
];

export default function OrderForm(props) {
  const [ubahAlamat, setUbahAlamat] = useState(false);
  return (
    <div className="container mx-auto mt-4 rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      {!ubahAlamat ? (
        <Order setUbahAlamat={setUbahAlamat} {...props} />
      ) : (
        <UbahAlamatComponent
          setUbahAlamat={setUbahAlamat}
          updateFields={props.updateFields}
          alamat={props.alamat}
        />
      )}
    </div>
  );
}

const Order = ({
  setUbahAlamat,
  merk,
  layanan,
  deskripsi,
  alamat,
  updateFields,
}) => {
  const route = useRouter();
  return (
    <>
      <section className="flex gap-10 h-max">
        <button
          className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
          onClick={() => route.back()}
        >
          <IconArrowLeft />
        </button>
        <h1 className="text-2xl font-medium">Order to Paryanto Service </h1>
      </section>

      <section className="mx-16 mt-12">
        <p>
          <span className="text-text">Layanan yang dipilih : </span>
          <b>Layanan 1</b>
        </p>

        <div className="grid gap-2 max-w-md mt-4">
          <label className="font-semibold">Merk</label>
          <InputText
            placeholder="LG"
            value={merk}
            onChange={(e) => updateFields({ merk: e.target.value })}
            required={true}
          />
        </div>
        <div className="grid gap-2 max-w-md mt-4">
          <label className="font-semibold">Jenis Pelayanan / Perbaikan</label>
          <Select
            value={layanan}
            onChange={(e) => updateFields({ layanan: e.target.value })}
            required={true}
          >
            <option value="">-- pilih jenis layanan --</option>
            <option value="tv">Services TV</option>
            <option value="laptop">Services laptop</option>
            <option value="motor">Services motor</option>
          </Select>
        </div>
        <div className="grid gap-2 max-w-md mt-4">
          <label className="font-semibold">Deskripsi Kerusakan</label>
          <InputTextarea
            placeholder="Tiba Tiba bluescreen"
            value={deskripsi}
            onChange={(e) => updateFields({ deskripsi: e.target.value })}
          ></InputTextarea>
        </div>
      </section>

      <section className="flex justify-between mt-4 mx-16 items-center  ">
        <p>Alamat anda : {alamat ? alamat : DEFAULT_ALAMAT[0]}</p>{" "}
        <button
          className="text-secondary font-semibold"
          onClick={() => setUbahAlamat(true)}
        >
          Ubah Alamat
        </button>
      </section>

      <section className="mt-4 mx-16">
        <ButtonSecondary type="submit">Lanjutkan</ButtonSecondary>
      </section>
    </>
  );
};

const UbahAlamatComponent = ({ setUbahAlamat, updateFields, alamat }) => {
  const [plan, setPlan] = useState(alamat ? alamat : DEFAULT_ALAMAT[0]);

  const handleChange = (value) => {
    setPlan(value);
    setUbahAlamat(value);
    updateFields({ alamat: value });
  };

  return (
    <>
      <section className="flex gap-10 h-max ">
        <button
          className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
          onClick={() => setUbahAlamat(false)}
        >
          <IconArrowLeft />
        </button>
        <h1 className="text-2xl font-medium"> Ubah Alamat </h1>
      </section>

      <section className="mx-16 mt-12">
        <h2 className="font-semibold mb-8">Daftar Alamat</h2>

        <RadioGroup value={plan} onChange={handleChange}>
          <div className="p-2 bg-white border border-text rounded-lg max-w-xl">
            {DEFAULT_ALAMAT.map((item, i) => (
              <RadioGroup.Option
                value={item}
                className="border-b border-b-gray-300 last:border-none py-4"
                key={i}
              >
                {({ checked }) => (
                  <div className="flex justify-between cursor-pointer">
                    <span>{item}</span>{" "}
                    {checked && (
                      <span className="font-semibold text-secondary">
                        Selected
                      </span>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        <ButtonSecondary className="mt-4">Tambah Alamat Baru</ButtonSecondary>
      </section>
    </>
  );
};
