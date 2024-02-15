"use client";

import React, { useState, useEffect } from "react";
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
    <div className="container mx-auto overflow-x-auto p-4 lg:p-0 lg:pb-0">
      {hasilData && hasilWilayah && namaPaslon && (
        <TabelWilayah
          data={hasilData}
          wilayah={hasilWilayah}
          nama={namaPaslon}
        />
      )}
    </div>
  );
};

export default Wilayah;
