"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ProgresTPS from "../ProgresTPS";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

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
            height: 400,
          },
        },
      },
    ],
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center border-0 md:border border-gray-200 shadow-none md:shadow rounded-lg">
        <div className="pt-4">
          <ApexCharts
            options={options}
            series={options.series}
            type="pie"
            width={"500"}
            height={400}
          />
        </div>

        <div className="p-4">
          <table className="border border-gray-200 text-sm text-left">
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
                  <tr className="bg-white border-b hover:bg-gray-200" key={index}>
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
    </div>
  );
};

export default DataPilpres;
