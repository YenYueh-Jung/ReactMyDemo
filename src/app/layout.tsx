import type { Metadata } from "next";
//import Navbar from "../components/Navbar";
import ClientNavbar from "../components/ClientNavbar"; 
import "./globals.css";

export const metadata: Metadata = {
  title: "Jo API",
  description: "API integrate sample",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ClientNavbar/> {/*  Navbar 只會在 Client 端渲染 */}
        {children}
        
      </body>
    </html>
  );
}

