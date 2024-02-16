import { Gabarito } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata = {
  title: "Hasil Real Count Pilpres 2024",
  description: "Website sederhana untuk melihat hasil Real Count Pilpres 2024.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={gabarito.className}>{children}</body>
    </html>
  );
}
