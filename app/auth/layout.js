import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
