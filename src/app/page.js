"use client";

import { useState, useEffect } from "react";
import DataPilpres from "@/components/DataPilpres";
import { getHitungData, getNamaPaslon } from "@/libs/api-libs";
import Footer from "@/components/Footer";
import ProgresTPS from "@/components/ProgresTPS";

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
        <ProgresTPS data={hasilData} />
        <Footer
          link="/wilayah"
          text="Klik untuk melihat real count berdasarkan wilayah"
        />
      </div>
    </div>
  );
};

export default Home;
