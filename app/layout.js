import "@/styles/globals.css";

export const metadata = {
  title: "Homepage",
  description: "Pronic menyediakan segala hal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="/assets/fonts/stylesheet.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
