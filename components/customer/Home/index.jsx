"use client";
import { toRupiah } from "@/utils/convert";
import { Listbox } from "@headlessui/react";
import { IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";
import { IconBookmark } from "@tabler/icons-react";
import { IconStar } from "@tabler/icons-react";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";

const DEFAULT_CATALOG = [
  {
    id: 1,
    name: "Pasryanto Service",
    image: "/assets/img/image-service.jpg",
    harga_min: 50000,
    harga_max: 110000,
    bidang: ["kelistrikan", "AC", "Televisi"],
    rating: 5,
  },
  {
    id: 2,
    name: "Pasryanto Service",
    image: "/assets/img/image-service.jpg",
    harga_min: 50000,
    harga_max: 110000,
    bidang: ["kelistrikan", "AC", "Televisi"],
    rating: 4.7,
  },
  {
    id: 3,
    name: "Pasryanto Service",
    image: "/assets/img/image-service.jpg",
    harga_min: 50000,
    harga_max: 110000,
    bidang: ["kelistrikan", "AC", "Televisi"],
    rating: 3.5,
  },
  {
    id: 4,
    name: "Pasryanto Service",
    image: "/assets/img/image-service.jpg",
    harga_min: 50000,
    harga_max: 110000,
    bidang: ["kelistrikan", "AC", "Televisi"],
    rating: 1,
  },
];

const DEFAULT_DAERAH = ["Jabodetabek", "Surabaya", "Bandung"];

const DEFAULT_JENIS = ["Televisi", "AC", "Handphone"];

const DEFAULT_URUT = ["Terdekat", "Termurah"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [daerah, setDaerah] = useState("");
  const [jenis, setJenis] = useState("");
  const [urut, setUrut] = useState("");

  useEffect(() => {
    if (search == "") return;
    const getData = setTimeout(() => {
      console.log(search, daerah, jenis, urut);
    }, 1000);

    // debounce
    return () => clearTimeout(getData);
  }, [search, daerah, jenis, urut]);

  return (
    <>
      <h1 className="text-title text-2xl font-semibold">Dashboard</h1>

      {/* FILTER */}
      <section className="flex justify-between gap-3 mt-4">
        <div className="flex-1 relative">
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
          <Dropdown name="Daerah" items={DEFAULT_DAERAH} setItem={setDaerah} />
        </div>
        <div className="flex-1">
          <Dropdown
            name="Jenis/Bidang"
            items={DEFAULT_JENIS}
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
      <CardList items={DEFAULT_CATALOG} />
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
        <Listbox.Options className="p-2 rounded-lg w-full bg-white absolute">
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
  const [ratio, setRatio] = useState(16 / 9);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= item.rating) {
      stars.push(<IconStarFilled className="text-yellow-300" key={i} />);
    } else {
      stars.push(<IconStar className="text-yellow-300" key={i} />);
    }
  }

  if (item.rating % 1 != 0) {
    stars[Math.ceil(item.rating - 1)] = (
      <IconStarHalfFilled className="text-yellow-300" key={10} />
    );
  }

  return (
    <div className="relative p-2 rounded-lg border border-text">
      <Image
        src={item.image}
        alt="image-catalog"
        width={300}
        height={300 / ratio}
        loading="lazy"
        className="object-cover"
        onLoadingComplete={({ naturalWidth, naturalHeight }) =>
          setRatio(naturalWidth / naturalHeight)
        }
        priority={false}
      />
      <h3 className="font-semibold text-xl">{item.name}</h3>
      <p className="font-semibold text-base">
        {toRupiah(item.harga_min)} - {toRupiah(item.harga_max)}
      </p>

      <p className="font-semibold text-text text-base">Bidang</p>
      <p className="font-medium text-text text-base">
        {item.bidang.join(", ")}
      </p>

      <div className="flex">{stars}</div>

      <button className="absolute right-2 bottom-2 bg-blueTransparant text-secondary rounded-full p-2">
        <IconBookmark />
      </button>
    </div>
  );
};
