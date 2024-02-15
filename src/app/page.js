import DataPilpres from "@/components/DataPilpres";
import { getHitungData, getNamaPaslon } from "@/libs/api-libs";

const Home = async () => {

  const hasilData = await getHitungData();
  const namaPaslon = await getNamaPaslon();

  return (
    <div className="container mx-auto overflow-x-auto p-4 pb-32 lg:p-0 lg:pb-0">
      <DataPilpres data={hasilData} nama={namaPaslon} />
    </div>
  );
}

export default Home;