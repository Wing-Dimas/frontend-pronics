import ComponentDetailCustomer from "@/components/customer/detail-toko";
import React from "react";

export const metadata = {
  title: "Detail Toko",
  description: "Pronic menyediakan segala hal",
};

export default function DetailToko({ params }) {
  return <ComponentDetailCustomer id={params.id_mitra} />;
}
