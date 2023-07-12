"use client";
import { toRupiah } from "@/utils/convert";
import GenerateStar from "@/utils/generate-star";
import { session } from "@/utils/userAuth";
import { Listbox } from "@headlessui/react";
import { IconBookmark } from "@tabler/icons-react";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DEFAULT_URUT = ["terdekat", "termurah", "rating", "tertinggi"];

const getAlamat = async () => {
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

  const {
    data: { alamat },
  } = await res.json();
  const alamatUtama = alamat.filter((item) => item.is_utama)[0];
  return alamatUtama;
};

export default function Home({ dataWilayah, dataKategori }) {
  const [search, setSearch] = useState("");
  const [daerah, setDaerah] = useState("");
  const [jenis, setJenis] = useState("");
  const [urut, setUrut] = useState("");

  const [katalog, setKatalog] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { token } = await session();
      const alamatCustomer = await getAlamat();

      const params = new URLSearchParams({
        search: "",
        daerah: "",
        bidang: "",
        urut: "",
        alamatCustomer: alamatCustomer,
      }).toString();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/mitra/showKatalog?${params}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await res.json();
      setKatalog(data);
    };

    getData();
  }, []);

  useEffect(() => {
    if (search != "" && daerah != "" && jenis != "" && urut != "") return;
    const getData = setTimeout(async () => {
      const { token } = await session();
      const alamatCustomer = await getAlamat();
      const params = new URLSearchParams({
        search,
        daerah,
        bidang: jenis,
        urut,
        alamatCustomer: alamatCustomer,
      }).toString();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/mitra/showKatalog?${params}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await res.json();
      setKatalog(data);
    }, 1000);

    // debounce
    return () => clearTimeout(getData);
  }, [search, daerah, jenis, urut]);

  return (
    <>
      <h1 className="text-title text-2xl font-semibold">Dashboard</h1>

      {/* FILTER */}
      <section className="flex justify-between gap-3 mt-4">
        <div className="flex-1 relative z-50">
          <input
            type="text"
            placeholder="Cari di Pronics..."
            className="py-2 pl-10 pr-4 rounded-lg outline-none border border-text bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconSearch className="absolute top-2 left-2 text-text" />
        </div>
        <div className="flex-1">
          <Dropdown name="Daerah" items={dataWilayah} setItem={setDaerah} />
        </div>
        <div className="flex-1">
          <Dropdown
            name="Jenis/Bidang"
            items={dataKategori}
            setItem={setJenis}
          />
        </div>
        <div className="flex-1">
          <Dropdown
            name="Urut Berdasarkan"
            items={DEFAULT_URUT}
            setItem={setUrut}
          />
        </div>
      </section>

      {/* CATALOG */}
      <CardList items={katalog} />
    </>
  );
}

const Dropdown = ({ name, items, setItem }) => {
  const [selectedItem, setSelectedItem] = useState(name);

  const handleChange = (value) => {
    setSelectedItem(value);
    setItem(value);
  };

  return (
    <div className="relative">
      <Listbox value={selectedItem} onChange={handleChange}>
        <Listbox.Button className="flex justify-between items-center py-2 px-4 rounded-lg outline-none text-lg font-semibold bg-slate-200 w-full">
          {selectedItem} <IconChevronDown />
        </Listbox.Button>
        <Listbox.Options className="p-2 rounded-lg w-full bg-white absolute z-50 shadow-xl">
          {items.map((item, i) => (
            <Listbox.Option key={i} value={item} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={`px-2 py-1 rounded-lg w-full hover:bg-slate-200 hover:cursor-pointer ${
                    selected && "bg-slate-200 "
                  }`}
                >
                  {item}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

const CardList = ({ items }) => {
  return (
    <div className="grid grid-cols-3 gap-5 mt-8">
      {items.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

const Card = ({ item }) => {
  const route = useRouter();

  const handleSaved = async () => {
    const { token } = await session();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/saved/add/${item.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { meta, data } = await res.json();

    if (meta?.code === 200) {
      MySwal.fire({
        title: meta.message,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      MySwal.fire({
        title: meta.message,
        text: data,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Link
      href={`/customer/detail-toko/${item.id}`}
      className="relative p-2 rounded-lg border border-text hover:cursor-pointer hover:shadow-xl transition-all"
      // onClick={() => route.push(`/customer/${item.id}/detail-toko`)}
    >
      <img
        src={item.gambar || "/assets/img/image-service.jpg"}
        alt="image-catalog"
        loading="lazy"
        className="object-cover aspect-video"
        // onLoadingComplete={({ naturalWidth, naturalHeight }) =>
        //   setRatio(naturalWidth / naturalHeight)
        // }
        // priority={false}
      />
      <h3 className="font-semibold text-xl">{item.name}</h3>
      <p className="font-semibold text-base">
        {toRupiah(item.minimal_price)} - {toRupiah(item.maximal_price)}
      </p>

      <p className="font-semibold text-text text-base">Bidang</p>
      <p className="font-medium text-text text-base">
        {item.bidang.map((text) => text.nama_bidang).join(", ")}
      </p>

      <div className="flex">
        <GenerateStar rating={item.rating} />
      </div>

      <button
        className="absolute right-2 bottom-2 bg-blueTransparant text-secondary rounded-full p-2"
        onClick={handleSaved}
      >
        <IconBookmark />
      </button>
    </Link>
  );
};
