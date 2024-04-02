import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomProvider from "@/redux/Provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxury Chauffeur By Citi Soluton",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <CustomProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </html>
    </CustomProvider>
  );
}
