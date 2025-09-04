"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function UnitConverter() {
  const router = useRouter();
  const { t } = useTranslation("common");

  const units = [
    {
      key :  "lengthConverter",
      path : "/length"
    },
    {
      key :  "tempretureConverter",
      path : "/tempreture"
    },
    {
      key :  "timeConverter",
      path : "/time"
    },
    {
      key :  "areaConverter",
      path : "/area"
    },
    {
      key :  "massConverter",
      path : "/mass"
    },
  ];


  

  return (
    <div className="w-full self-center mx-auto justify-center md:w-[60%] lg:w-[40%]  mt-2 md:mt-8 py-4 flex items-center gap-4 px-6 flex-col min-w-[280px] rounded">
      <h1 className="text-xl md:text-3xl font-semibold text-primary self-start">
        📏 {t("unitConverterTitle")}
      </h1>

      {units.map((item) => {
        return (
          <button
            onClick={() => router.push(`/tools/utility/unit-converter/${item.path}`)}
            className="border-2 border-primary text-primary bg-white px-6 py-2 rounded cursor-pointer hover:bg-primary shadow-lg hover:text-white w-full"
          >
            {t(item.key)}
          </button>
        );
      })}
    </div>
  );
}
