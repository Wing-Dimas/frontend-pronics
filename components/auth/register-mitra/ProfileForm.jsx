import React, { useState } from "react";
import InputText from "@/components/InputText";
import RadioButton from "@/components/RadioButton";
import InputTextarea from "@/components/InputTextarea";

export default function ProfileForm({
  type,
  nama,
  handphone,
  deskripsiDiri,
  email,
  password,
  alamat,
  updateFields,
}) {
  const [typeRegister, setTypeRegister] = useState({
    individu: type === "individu",
    toko: type === "toko",
  });

  const hadleRadioButton = (e) => {
    const { value } = e.target;
    updateFields({ type: value });
    if (value === "individu") {
      setTypeRegister({ individu: true, toko: false });
    } else {
      setTypeRegister({ individu: false, toko: true });
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 mt-8">
        <RadioButton
          name="type-register"
          id="individu"
          value="individu"
          checked={typeRegister.individu}
          onChange={hadleRadioButton}
          text="Daftar Sebagai Individu"
        />
        <RadioButton
          name="type-register"
          id="toko"
          value="toko"
          checked={typeRegister.toko}
          onChange={hadleRadioButton}
          text="Daftar Toko atau Bengkel"
        />
      </div>

      <h2 className="text-2xl font-bold mt-8">Informasi Profile</h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8 mt-8">
        <div className="grid grid-rows-[repeat(4,_auto)_1fr] lg:grid-cols-[1fr_2fr] grid-cols-1 gap-5">
          <label
            htmlFor="nama"
            className="flex items-center text-text text-xl font-medium whitespace-nowrap"
          >
            Nama Lengkap
          </label>
          <InputText
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => updateFields({ nama: e.target.value })}
            className="min-w-[180px] max-h-12 flex-1"
            required={true}
          />

          <label
            htmlFor="handphone"
            className="flex items-center text-text text-xl font-medium whitespace-nowrap"
          >
            Handphone
          </label>
          <InputText
            type="text"
            id="handphone"
            value={handphone}
            onChange={(e) => updateFields({ handphone: e.target.value })}
            className="min-w-[180px] max-h-12 flex-1"
            required={true}
          />

          <label
            htmlFor="deskripsi-diri"
            className="flex items-start text-text text-xl font-medium whitespace-nowrap"
          >
            Deskripsi Diri
          </label>
          <InputTextarea
            id="deskripsi-diri"
            value={deskripsiDiri}
            onChange={(e) => updateFields({ deskripsiDiri: e.target.value })}
            className="min-w-[180px] flex-1"
          ></InputTextarea>
        </div>
        <div className="grid grid-rows-[repeat(4,_auto)_1fr] lg:grid-cols-[1fr_2fr] grid-cols-1 gap-5">
          <label
            htmlFor="email"
            className="flex items-center text-text text-xl font-medium whitespace-nowrap"
          >
            Email
          </label>
          <InputText
            type="email"
            id="email"
            value={email}
            onChange={(e) => updateFields({ email: e.target.value })}
            className="min-w-[180px] max-h-12 flex-1"
            required={true}
          />

          <label
            htmlFor="password"
            className="flex items-center text-text text-xl font-medium whitespace-nowrap"
          >
            Password
          </label>
          <InputText
            type="password"
            id="password"
            value={password}
            onChange={(e) => updateFields({ password: e.target.value })}
            className="min-w-[180px] max-h-12 flex-1"
            required={true}
          />

          <label
            htmlFor="alamat"
            className="flex items-start text-text text-xl font-medium whitespace-nowrap"
          >
            Alamat
          </label>
          <InputTextarea
            id="alamat"
            value={alamat}
            onChange={(e) => updateFields({ alamat: e.target.value })}
            className="min-w-[180px] flex-1"
            required={true}
          ></InputTextarea>
        </div>
      </div>
    </>
  );
}
