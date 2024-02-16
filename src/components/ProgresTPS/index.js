const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "";
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

const ProgresTPS = ({ data }) => {
  const formattedTimestamp = formatDate(data?.ts);
  const progressTps = data?.progres?.progres;
  const totalTps = data?.progres?.total;
  const persen = data?.chart?.persen ?? 0;

  return (
    <div className="fixed bottom-4 right-0 p-4">
      <div className="text-center text-sm p-4 backdrop-blur-sm bg-slate-900/70 text-white leading-loose rounded-lg">
        <span>Versi data: {formattedTimestamp}</span>

        <span> - </span>

        <span>
          {progressTps} dari {totalTps} TPS ({persen}%)
        </span>
      </div>
    </div>
  );
};

export default ProgresTPS;