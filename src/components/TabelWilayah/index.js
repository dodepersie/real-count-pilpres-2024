function formatNumber(number) {
  if (!number || isNaN(number)) return "-";
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
          Progres Suara
        </th>
      </tr>
    );
  };

  const renderTableRow = (regionCode) => {
    const regionData = wilayah.find((region) => region.kode === regionCode);
    if (!regionData) return null;

    return (
      <tr key={regionCode} className="hover:bg-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {regionData.nama}
        </th>
        {Object.keys(namaMapping).map((key) => (
          <td scope="col" className="px-6 py-3" key={key}>
            {formatNumber(data.table[regionCode][key])}{" "}
          </td>
        ))}
        <td scope="col" className="font-bold px-6 py-3">
          {data.table[regionCode]["persen"]
            ? `${data.table[regionCode]["persen"]}%`
            : "-"}
        </td>
      </tr>
    );
  };

  const regionCodes = Object.keys(data.table);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full border-2 border-gray-200 shadow-md text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            {renderTableHeader()}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {regionCodes.map((regionCode, index) => renderTableRow(regionCode))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelData;
