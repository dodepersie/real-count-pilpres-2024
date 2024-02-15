import Link from "next/link";

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
  const formattedTimestamp = formatDate(data.ts);
  const progressTps = data.progres.progres;
  const totalTps = data.progres.total;

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Hasil Suara Real Count Pilpres Nasional 2024
        </h1>
        <table className="border-2 border-gray-200 shadow-md w-full text-sm text-left">
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
            {Object.keys(data.chart).map((key, index) => {
              const namaPaslon = nama[key]?.nama;
              const nomorUrut = nama[key]?.nomor_urut;
              const jumlahSuara = formatNumber(data.chart[key]);

              return (
                <tr className="bg-white border-b" key={index}>
                  <td className="px-6 py-4">{nomorUrut}</td>
                  <td className="px-6 py-4">{namaPaslon}</td>
                  <td className="px-6 py-4">{jumlahSuara}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className=" fixed bottom-4 left-0 p-4">
          <div className="text-center text-xs p-4 backdrop-blur-sm bg-slate-700/50 text-white leading-loose rounded-lg">
            <span>Versi data: {formattedTimestamp}</span>

            <span>
              {progressTps} dari {totalTps} TPS
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-xs gap-3">
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
          <span>Coded by: dode_p3rsie</span>
        </div>
      </div>
    </div>
  );
};

export default DataPilpres;
