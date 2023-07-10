"use client";
import Loader from "@/components/Loader";
import { session } from "@/utils/userAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = async () => {
      const data = await session();

      if (data?.user?.tipe === "mitra" && data?.token) {
        return route.push("/mitra");
      } else if (data?.user?.tipe === "customer" && data?.token) {
        return route.push("/customer");
      } else {
        setIsLoading(false);
      }
    };
    isAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Image
        src="/assets/img/logo_pronics.png"
        width={274}
        height={89}
        alt="logo_pronics"
        placeholder="blur"
        blurDataURL={"/assets/img/logo_pronics.png"}
        priority={true}
        className="mx-auto mt-10"
      />
      <section className="container min-w-full pb-28">{children}</section>
    </div>
  );
}
