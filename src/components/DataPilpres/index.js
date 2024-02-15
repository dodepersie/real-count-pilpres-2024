"use client"

import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

const DataPilpres = ({ data, nama }) => {
  const [chartData, setChartData] = useState([]);
  const formattedTimestamp = formatDate(data.ts);
  const progressTps = data.progres.progres;
  const totalTps = data.progres.total;
  const persen = data.chart["persen"];
  const chartKeys = Object.keys(data.chart).filter((key) => key !== "persen");

  useEffect(() => {
    const preparedData = Object.keys(data.chart)
      .filter((key) => key !== "persen")
      .map((key) => {
        const namaPaslon = nama[key]?.nama;
        const jumlahSuara = data.chart[key];
        return {
          name: namaPaslon,
          data: jumlahSuara,
        };
      });
    setChartData(preparedData);
  }, [data, nama]);
  const options = {
    chart: {
      id: "persentase-paslon",
    },
    legend: {
      position: "bottom",
    },
    labels: chartData.map((item) => item.name),
    series: chartData.map((item) => item.data),
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
            height: 300,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Hasil Suara Real Count Pilpres Nasional 2024
        </h1>

        <div className="flex flex-col justify-center items-center border border-gray-200 shadow rounded-xl gap-4">
          <div className="pt-4">
            <ApexCharts
              options={options}
              series={options.series}
              type="pie"
              width={"500"}
              height={400}
            />
          </div>

          <div className="p-8 md:p-0">
            <table className="shadow border border-gray-200 text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nomor Urut
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Paslon
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jumlah Suara
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartKeys.map((key, index) => {
                  const namaPaslon = nama[key]?.nama;
                  const nomorUrut = nama[key]?.nomor_urut;
                  const jumlahSuara = formatNumber(data.chart[key]);

                  return (
                    <tr className="bg-white border-b" key={index}>
                      <td className="px-6 py-4">{nomorUrut}</td>
                      <td className="px-6 py-4">{namaPaslon}</td>
                      <td className="px-6 py-4 font-bold">{jumlahSuara}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

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

      <div className="fixed bottom-4 right-0 p-4">
        <div className="text-center text-sm p-4 backdrop-blur-sm bg-slate-900/70 text-white leading-loose rounded-lg">
          <span>Versi data: {formattedTimestamp}</span>

          <span> - </span>

          <span>
            {progressTps} dari {totalTps} TPS ({persen}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataPilpres;
