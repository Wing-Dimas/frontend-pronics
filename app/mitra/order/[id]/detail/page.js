import DetailOrder from "@/components/mitra/order/Detail";
import React from "react";

export default function DetailPage({ params }) {
  return <DetailOrder id={params.id} />;
}
