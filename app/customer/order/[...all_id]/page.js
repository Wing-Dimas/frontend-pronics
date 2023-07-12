import OrderComponent from "@/components/customer/order";
import React from "react";

export const metadata = {
  title: "Customer | Order",
};

export default function OrderService({ params }) {
  return <OrderComponent id={params.all_id} />;
}
