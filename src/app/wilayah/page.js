"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import TabelWilayah from "@/components/TabelWilayah";
import { getHitungData, getHasilWilayah, getNamaPaslon } from "@/libs/api-libs";

const Wilayah = () => {
  const [hasilData, setHasilData] = useState(null);
  const [hasilWilayah, setHasilWilayah] = useState(null);
  const [namaPaslon, setNamaPaslon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hitungData = await getHitungData();
        const wilayahData = await getHasilWilayah();
        const paslonData = await getNamaPaslon();
        setHasilData(hitungData);
        setHasilWilayah(wilayahData);
        setNamaPaslon(paslonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto max-w-5xl overflow-hidden p-4 space-y-4">
      <h1 className="text-2xl font-semibold text-center">
        Hasil Real Count Pilpres Berdasarkan Wilayah 2024
      </h1>
      {hasilData && hasilWilayah && namaPaslon && (
        <TabelWilayah
          data={hasilData}
          wilayah={hasilWilayah}
          nama={namaPaslon}
        />
      )}
      <div className="flex flex-col justify-center items-center text-sm text-center gap-3">
        <Link href="/" className="underline">
          Kembali ke halaman awal
        </Link>
        <span>
          Sumber data:{" "}
          <Link
            href="https://pemilu2024.kpu.go.id/pilpres/hitung-suara/"
            target="_blank"
            className="underline"
          >
            Komisi Pemilihan Umum Indonesia
          </Link>
        </span>{" "}
        <span>&copy; 2024 dode_p3rsie</span>
      </div>
    </div>
  );
};

export default Wilayah;
