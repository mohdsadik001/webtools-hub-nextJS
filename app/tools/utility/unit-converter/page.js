"use client";

import { useRouter } from "next/navigation";

export default function UnitConverter() {
  const router = useRouter();

  return (
    <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] border border-gray-400 h-auto md:h-[70vh] flex items-center gap-4 px-6 flex-col py-8 min-w-[280px] rounded">
      <button
        onClick={() => router.push("/tools/utility/unit-converter/length")}
        className="border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full"
      >
        Length Converter
      </button>
      <button
        onClick={() => router.push("/tools/utility/unit-converter/tempreture")}
        className="border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full"
      >
        Temperature Converter
      </button>
      <button
        onClick={() => router.push("/tools/utility/unit-converter/time")}
        className="border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full"
      >
        Time Converter
      </button>
      <button
        onClick={() => router.push("/tools/utility/unit-converter/area")}
        className="border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full"
      >
        Area Converter
      </button>
      <button
        onClick={() => router.push("/tools/utility/unit-converter/mass")}
        className="border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full"
      >
        Mass Converter
      </button>
    </div>
  );
}
