import Invoice from "@/components/mitra/history/Invoice";
import React from "react";

export default function page({ params }) {
  return <Invoice id={params.id} />;
}
