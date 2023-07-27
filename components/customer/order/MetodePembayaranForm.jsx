import { toRupiah } from "@/utils/convert";
import useNavigate from "@/utils/dashboard/useNavigate";
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Dropzone from "@/components/Dropzone";
import ButtonSecondary from "@/components/ButtonSecondary";
import { session } from "@/utils/userAuth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

const BankTransfer = ({ order_payment_id, id_mitra, total_biaya }) => {
  const [data, setData] = useState(null);
  const [rekening, setRekening] = useState(null);
  const [image, setImage] = useState(null);
  const route = useRouter();

  const controller = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      const { token } = await session();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/rekening/mitra/${id_mitra}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        }
      );

      const { data } = await res.json();
      setRekening(data);
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const handleImage = (image) => {
    setImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const { token } = await session();
    const formData = new FormData();

    formData.append("metode_pembayaran", "bank transfer");
    formData.append("bukti_bayar", image);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/orderPayment/confirmPayment/${order_payment_id}`,
      {
        method: "POST",
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
          return route.push("/customer/pembayaran/success");
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
    <form onSubmit={handleSubmit}>
      <div>
        <p className="flex justify-between w-96">
          <span className="font-medium text-text">Nama Pemilik</span>
          <span className="font-medium">{rekening?.nama_pemilik}</span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-medium text-text">Nama Bank</span>
          <span className="font-medium">{rekening?.bank.nama_bank}</span>
        </p>
        <p className="flex justify-between w-96">
          <span className="font-medium text-text">Nomor Rekening</span>
          <span className="font-medium">{rekening?.nomer_rekening}</span>
        </p>
        <p className="flex justify-between w-96 mb-4">
          <span className="font-medium text-text">Total Bayar</span>
          <span className="font-medium">{toRupiah(total_biaya)}</span>
        </p>
        <Dropzone handleImage={handleImage}>Upload bukti Bayar</Dropzone>

        <div className="flex justify-end">
          <ButtonSecondary type="submit">Selesai</ButtonSecondary>
        </div>
      </div>
    </form>
  );
};

const BayarOtomatis = () => {
  return <div>Comming Soon</div>;
};
const Cash = ({ order_payment_id, total_biaya }) => {
  const route = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { token } = await session();
    const formData = new FormData();

    formData.append("metode_pembayaran", "cash");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/orderPayment/confirmPayment/${order_payment_id}`,
      {
        method: "POST",
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
          return route.push("/customer/pembayaran/success");
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
    <form onSubmit={handleSubmit}>
      <p className="flex justify-between w-96">
        <span className="font-medium text-text">
          Total yang harus anda bayar
        </span>
        <span className="font-medium">{toRupiah(total_biaya)}</span>
      </p>

      <p className="text-yellow-400">
        Anda bisa melihat pembayaran pada history
      </p>

      <div className="flex justify-end mt-8">
        <ButtonSecondary type="submit">Selesai</ButtonSecondary>
      </div>
    </form>
  );
};

export default function MetodePembayaranForm({
  order_payment_id,
  metodePembayaran,
  updateFields,
  total_biaya,
  back,
  id,
}) {
  const [id_layanan, id_mitra] = id;
  const pages = [
    {
      name: "Bank Transfer",
      element: (
        <BankTransfer
          order_payment_id={order_payment_id}
          id_mitra={id_mitra}
          total_biaya={total_biaya}
        />
      ),
    },
    {
      name: "Bayar Otomatis",
      element: <BayarOtomatis />,
    },
    {
      name: "Cash",
      element: (
        <Cash order_payment_id={order_payment_id} total_biaya={total_biaya} />
      ),
    },
  ];

  const { currentNavigate, page, toPage } = useNavigate(pages);

  return (
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
        <p className="text-text">pilih metode pembayaran</p>
        <div className="flex justify-between gap-4 mb-8">
          <Button
            className="flex-1"
            onClick={() => toPage("Bank Transfer")}
            active={currentNavigate == "Bank Transfer"}
          >
            Bank Transfer
          </Button>
          <span className="w-[2px] h-11 bg-slate-200"></span>
          <Button
            className="flex-1"
            onClick={() => toPage("Bayar Otomatis")}
            active={currentNavigate == "Bayar Otomatis"}
          >
            Bayar Otomatis
          </Button>
          <span className="w-[2px] h-11 bg-slate-200"></span>
          <Button
            className="flex-1"
            onClick={() => toPage("Cash")}
            active={currentNavigate == "Cash"}
          >
            Cash
          </Button>
        </div>

        {page.element}
      </section>
    </div>
  );
}

function Button({ className, onClick, children, active, type = "button" }) {
  return (
    <button
      onClick={onClick}
      className={`text-2xl font-medium rounded-lg py-2 transition-all duration-150  ${
        active ? "bg-secondary text-white" : "text-text hover:bg-slate-200"
      } ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}
