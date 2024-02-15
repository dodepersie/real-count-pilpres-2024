import TabelWilayah from "@/components/TabelWilayah";
import { getHitungData, getHasilWilayah, getNamaPaslon } from "@/libs/api-libs";

const Wilayah = async () => {

  const hasilData = await getHitungData();
  const hasilWilayah = await getHasilWilayah();
  const namaPaslon = await getNamaPaslon();

  return (
    <div className="container mx-auto overflow-x-auto p-4 pb-32 lg:p-0 lg:pb-0">
      <TabelWilayah data={hasilData} wilayah={hasilWilayah} nama={namaPaslon} />
    </div>
  );
}

export default Wilayah;