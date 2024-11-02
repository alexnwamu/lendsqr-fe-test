import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const avenirBold = localFont({
  src: "./fonts/AvenirNextLTPro-Bold.otf",
  variable: "--font-avenir-bold",
  weight: "400 900",
});
const worksSans = localFont({
  src: "./fonts/WorkSans-VariableFont_wght.ttf",
  variable: "--work-sans",
  weight: "100 900",
});

const avenir = localFont({
  src: "./fonts/AvenirNextLTPro-Regular.otf",
  variable: "--font-avenir",
  weight: "400 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${worksSans.variable} ${geistSans.variable} ${geistMono.variable} ${avenirBold.variable} ${avenir.variable} `}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
