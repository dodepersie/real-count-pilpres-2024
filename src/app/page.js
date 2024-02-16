"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import DataPilpres from "@/components/DataPilpres";
import { getHitungData, getNamaPaslon } from "@/libs/api-libs";

const Home = () => {
  const [hasilData, setHasilData] = useState(null);
  const [namaPaslon, setNamaPaslon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const hasilData = await getHitungData();
      const namaPaslon = await getNamaPaslon();
      setHasilData(hasilData);
      setNamaPaslon(namaPaslon);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto overflow-hidden p-4 pb-32 lg:p-0 lg:pb-0">
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <h1 className="text-2xl font-semibold text-center">
        🔥 Hasil Real Count Pilpres Nasional 2024 🔥
        </h1>
        {hasilData && namaPaslon && (
          <DataPilpres data={hasilData} nama={namaPaslon} />
        )}
        <div className="flex flex-col justify-center items-center text-sm text-center gap-3">
          <Link href="/wilayah" className="underline cursor-help">
            Klik untuk melihat hasil real count berdasarkan wilayah
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
    </div>
  );
};

export default Home;
