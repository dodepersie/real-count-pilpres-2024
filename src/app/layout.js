import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Hasil Suara Real Count Pilpres 2024",
  description: "Website sederhana untuk melihat hasil Real Count Pilpres 2024.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
