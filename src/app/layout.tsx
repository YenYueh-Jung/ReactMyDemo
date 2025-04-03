import type { Metadata } from "next";
//import Navbar from "../components/Navbar";
//import dynamic from "next/dynamic"; // 引入動態載入
import ClientNavbar from "../components/ClientNavbar"; // 只載入 ClientNavbar，而不是 Navbar
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
      
      {/* <Navbar/>讓 Navbar 只在客戶端渲染，避免 Hydration 錯誤 */}
      <ClientNavbar/> {/* 這樣 Navbar 只會在 Client 端渲染 */}
        {children}
        
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import Navbar from "../components/Navbar";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//       <Navbar/>
//         {children}
//       </body>
//     </html>
//   );
// }
