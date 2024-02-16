import Link from "next/link";

const date = new Date();
const year = date.getFullYear();

const Footer = ({ link, text }) => {
  return (
    <div className="flex flex-col justify-center items-center text-sm text-center gap-3">
      <Link
        href={link}
        className="ease-in duration-150 bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow"
      >
        {text}
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
      <span>&copy; {year} dode_p3rsie</span>
    </div>
  );
};

export default Footer;
