"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10 py-10">
      <div className="flex flex-col justify-center items-center text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <h3 className="text-xl">Page Not Found</h3>
      </div>

      <button
        className="bg-blue-500 text-white px-2 py-1 rounded-lg shadow"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
