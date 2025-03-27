import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../NavBar/NavBar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="container-sm">{children}</div>
      </body>
    </html>
  );
}
