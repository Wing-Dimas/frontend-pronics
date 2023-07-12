"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import userNoImage from "@/assets/user-no-image.png";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import InputText from "@/components/InputText";
import Image from "next/image";
import InputTextarea from "@/components/InputTextarea";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ButtonSecondary from "@/components/ButtonSecondary";
import { session } from "@/utils/userAuth";
import { sourceImgToFile } from "@/utils/sourceImgToFile";

const MySwal = withReactContent(Swal);

const INITAL_DATA = {
  nama: "",
  username: "",
  email: "",
  noHp: "",
  bio: "",
  jenisKelamin: "",
  tglLahir: "",
  foto: "",
};

export default function ProfileCustomer() {
  const [data, setData] = useState(INITAL_DATA);
  const [alamat, setAlamat] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { token } = await session();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/customer/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await res.json();

      setData({
        nama: data?.user_data.nama_lengkap,
        username: data?.username,
        email: data?.user_data.email,
        noHp: data?.user_data.no_telepon,
        bio: data?.user_data.bio,
        jenisKelamin: data?.user_data.jenis_kelamin,
        tglLahir: data?.user_data.tanggal_lahir,
        foto: data?.gambar_user,
      });

      setAlamat(data?.alamat);
    };

    getData();
  }, []);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const handleImage = (image) => {
    updateFields({ foto: image });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { token } = await session();

    const formData = new FormData();

    formData.append("nama_lengkap", data.nama);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("no_handphone", data.noHp);
    formData.append("bio", data.bio);
    formData.append("jenis_kelamin", data.jenisKelamin);
    formData.append("tanggal_lahir", data.tglLahir);
    formData.append("gambar_customer", data.foto);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/customer/profile/update`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();
    if (result?.meta?.code === 200) {
      MySwal.fire({
        title: result.meta.message,
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          return route.push("/customer/settings");
        }
      });
    } else {
      MySwal.fire({
        title: result.meta.message,
        text: result.data,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="container mx-auto rounded-lg p-2 min-h-[calc(100vh_-_200px)] ">
      <div className="flex gap-10 h-max">
        <Link
          href="/customer/settings"
          className="flex justify-center items-center text-3xl w-8 h-8 hover:bg-slate-200 duration-1w-80 rounded-full"
        >
          <IconArrowLeft />
        </Link>
        <h1 className="text-2xl font-medium">Profile</h1>
      </div>

      <div className="mx-16 mt-12">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Dropzone handleImage={handleImage} oldImage={data.foto} />
            <h2>Ketuk Untuk Ubah Foto Profile</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* INFO PROFILE */}
          <h2 className="font-bold mt-8">Info Profile</h2>
          <div className="grid grid-cols-2 w-[500px] gap-2">
            {/* NAMA LENGKAP */}
            <label htmlFor="nama-lengkap" className="text-text my-auto">
              Nama Lengkap
            </label>
            <InputText
              type="text"
              id="nama-lengkap"
              value={data.nama}
              onChange={(e) => updateFields({ nama: e.target.value })}
              placeholder="Nama Lengkap"
              required={true}
            />
            {/* USERNAME */}
            <label htmlFor="username" className="text-text my-auto">
              Username
            </label>
            <InputText
              type="text"
              id="username"
              value={data.username}
              onChange={(e) => updateFields({ username: e.target.value })}
              placeholder="Username"
              required={true}
            />
            {/* EMAIL */}
            <label htmlFor="email" className="text-text my-auto">
              Email
            </label>
            <InputText
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => updateFields({ email: e.target.value })}
              placeholder="Email"
              required={true}
            />
            {/* NO HANDPHONE */}
            <label htmlFor="no-handphone" className="text-text my-auto">
              No Handphone
            </label>
            <InputText
              type="text"
              id="no-handphone"
              value={data.noHp}
              onChange={(e) => updateFields({ noHp: e.target.value })}
              placeholder="No handphone"
              required={true}
            />

            {/* BIO */}
            <label htmlFor="bio" className="text-text my-auto">
              Bio
            </label>
            <InputTextarea
              id="bio"
              value={data.bio}
              onChange={(e) => updateFields({ bio: e.target.value })}
              placeholder="Masukkan Deskripsi Anda"
            ></InputTextarea>
          </div>

          {/* INFO PRIBADI */}
          <h2 className="font-bold mt-4">Info Pribadi</h2>
          <div className="grid grid-cols-2 w-[500px] gap-2">
            {/* JENIS KELAMIN */}
            <label htmlFor="jenis-kelamin" className="text-text my-auto">
              Jenis Kelamin
            </label>
            <Select
              id="jenis-kelamin"
              value={data.jenisKelamin}
              onChange={(e) => updateFields({ jenisKelamin: e.target.value })}
            >
              <option value=""></option>
              <option value="laki-laki">Laki-Laki</option>
              <option value="perempuan">Perempuan</option>
            </Select>
            {/* TANGGAL LAHIR */}
            <label
              htmlFor="tgl-lahir"
              className="text-text my-auto"
              value={data.tglLahir}
              onChange={(e) => updateFields({ tglLahir: e.target.value })}
            >
              Tanggal Lahir
            </label>
            <InputText
              type="date"
              id="tgl-lahir"
              value={data.tglLahir}
              onChange={(e) => updateFields({ tglLahir: e.target.value })}
              required={true}
            />
          </div>

          <div className="mt-4 flex gap-3">
            <ButtonSecondary type="button" onClick={() => setData(INITAL_DATA)}>
              Batalkan
            </ButtonSecondary>
            <ButtonSecondary type="submit">Simpan</ButtonSecondary>
          </div>
        </form>

        {/* ALAMAT */}
        <h2 className="font-bold mt-4">Daftar Alamat</h2>
        <ul>
          {alamat ? (
            alamat.map((item) => (
              <li
                className="flex justify-between items-start py-4 border-b last:border-b-slate-300"
                key={item.id}
              >
                <span className="text-text">{item.alamat}</span>
                {item.is_utama && (
                  <span className="font-bold text-secondary">Utama</span>
                )}
              </li>
            ))
          ) : (
            <p>Anda belum pernah menambahkan alamat</p>
          )}
        </ul>

        <div className="mt-8 flex justify-end">
          <ButtonSecondary
            type="button"
            onClick={() => route.push("/customer/settings/tambah-alamat")}
          >
            Tambahkan Alamat
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}

const Dropzone = ({ handleImage, oldImage }) => {
  const [image, setImage] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    handleImage(acceptedFiles[0]);
    setImage(
      acceptedFiles.map((upFile) =>
        Object.assign(upFile, { preview: URL.createObjectURL(upFile) })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    onDrop,
  });

  useEffect(() => {
    // if (oldImage === "" || typeof oldImage == "string") return;

    // const getFile = async () => {
    //   const file = await sourceImgToFile(oldImage);
    //   console.log(file);
    //   //   handleImage(file);
    //   //   setImage([Object.assign(file, { preview: URL.createObjectURL(file) })]);
    // };

    // getFile();
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => image.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex flex-col gap-4 justify-center items-center w-[60px]">
        <div className="flex flex-col gap-4 w-full h-[60px] justify-center items-center rounded-full overflow-hidden">
          {image.length === 0 ? (
            <>
              {oldImage ? (
                <img src={oldImage} className="w-[60px] h-60px object-cover" />
              ) : (
                <Image
                  src={userNoImage}
                  width={60}
                  height={60}
                  alt="no-image"
                />
              )}
              {isDragActive && <p>Drop the files here ...</p>}
            </>
          ) : (
            <>
              {image.map((upFile, i) => (
                <Image
                  src={upFile.preview}
                  width={60}
                  height={60}
                  alt="preview"
                  onLoad={() => {
                    URL.revokeObjectURL(upFile.preview);
                  }}
                  key={i}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
