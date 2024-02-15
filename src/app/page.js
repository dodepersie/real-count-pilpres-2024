"use client"

import React, { useState, useEffect } from "react";
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
    <div className="container mx-auto overflow-x-auto p-4 pb-32 lg:p-0 lg:pb-0">
      {hasilData && namaPaslon && <DataPilpres data={hasilData} nama={namaPaslon} />}
    </div>
  );
}

export default Home;
