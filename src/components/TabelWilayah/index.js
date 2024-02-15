import Link from "next/link";

function formatNumber(number) {
  if (!number || isNaN(number)) return "";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const TabelData = ({ data, wilayah, nama }) => {
  const namaMapping = Object.entries(nama).reduce((acc, [key, value]) => {
    acc[key] = value.nama;
    return acc;
  }, {});

  const renderTableHeader = () => {
    return (
      <tr>
        <th scope="col" className="px-6 py-3">
          Wilayah
        </th>
        {Object.keys(namaMapping).map((key) => (
          <th scope="col" className="px-6 py-3" key={key}>
            {namaMapping[key]}
          </th>
        ))}
        <th scope="col" className="px-6 py-3">
          Persen
        </th>
      </tr>
    );
  };

  const renderTableRow = (regionCode) => {
    const regionData = wilayah.find((region) => region.kode === regionCode);
    if (!regionData) return null;

    return (
      <tr key={regionCode}>
        <td scope="col" className="px-6 py-3">
          {regionData.nama}
        </td>
        {Object.keys(namaMapping).map((key) => (
          <td scope="col" className="px-6 py-3" key={key}>
            {formatNumber(data.table[regionCode][key])}{" "}
          </td>
        ))}
        <td scope="col" className="px-6 py-3">
          {data.table[regionCode]["persen"] || ""}%{" "}
        </td>
      </tr>
    );
  };

  const regionCodes = Object.keys(data.table);

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <h1 className="text-2xl font-semibold text-center">
          Hasil Suara Real Count Pilpres Wilayah 2024
        </h1>

        <table className="border-2 border-gray-200 shadow-md w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            {renderTableHeader()}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {regionCodes.map((regionCode, index) => renderTableRow(regionCode))}
          </tbody>
        </table>

        <div className="flex flex-col justify-center items-center text-xs gap-3">
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

export default TabelData;
