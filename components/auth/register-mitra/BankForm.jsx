import React from "react";
import InputText from "@/components/InputText";
import Select from "@/components/Select";
import Dropzone from "@/components/Dropzone";

const DEFAULT_BANK = ["BNI", "BRI"];

export default function BankForm({
  nasabah,
  bank,
  norek,
  picture,
  updateFields,
}) {
  console.log(bank);
  return (
    <>
      <p className="text-text text-2xl font-medium my-8">
        Informasi rekening dan validasi identitas
      </p>

      <div className="grid grid-rows-[repeat(4,_auto)_1fr] lg:grid-cols-[1fr_2fr] grid-cols-1 gap-5 max-w-full lg:max-w-[50%]">
        <label
          htmlFor="nama"
          className="flex items-center text-text text-xl font-medium whitespace-nowrap"
        >
          Nama Lengkap
        </label>
        <InputText
          type="text"
          id="nama"
          value={nasabah}
          onChange={(e) => updateFields({ nasabah: e.target.value })}
          className="min-w-[180px] max-h-12 flex-1"
        />

        <label
          htmlFor="bank"
          className="flex items-center text-text text-xl font-medium whitespace-nowrap"
        >
          Bank
        </label>
        <Select
          id="bank"
          className="min-w-[180px] max-h-12 flex-1"
          onChange={(e) => updateFields(e.target.value)}
        >
          <option value="">-- pilih bank --</option>
          {DEFAULT_BANK.map((item, i) => (
            <option value={item} selected={item == bank}>
              {item}
            </option>
          ))}
        </Select>

        <label
          htmlFor="norek"
          className="flex items-center text-text text-xl font-medium whitespace-nowrap"
        >
          Nomor Rekening
        </label>
        <InputText
          type="text"
          id="norek"
          value={norek}
          onChange={(e) => updateFields({ norek: e.target.value })}
          className="min-w-[180px] max-h-12 flex-1"
        />
      </div>

      <Dropzone />
      <p className="text-text text-xl font-medium w-1/2 mt-8">
        *Admin akan memverifikasi akun anda, jika informasi yang anda berikan
        valid maka akun anda akan segera aktif.
      </p>
    </>
  );
}
