"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Categories from "../shared/Categories";
import Button from "../ui/buttons/Button";

export default function HeroSection() {
  const router = useRouter();

  const { t } = useTranslation("hero");

  return (
    <section className="bg-gradient-to-br from-green-50 to-indigo-100 py-20 h-[92vh]">
      <div className="container mx-auto px-4 text-center">
        <div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            {t("title.part1")}{" "}
            <span className="text-primary">{t("title.highlight")}</span>{" "}
            {t("title.part2")}
          </h1>

          <p className="text-xl text-gray-600 mb-4 mt-8">{t("subtitle")}</p>
          <p className="text-lg text-gray-500 mb-8">{t("description")}</p>

          {/* Explore Tools Button */}
          <div className="flex justify-center gap-4 mb-12 mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/tools")}
              className="bg-primary text-white px-12 py-3 rounded-lg hover:bg-primary-dull transition-colors cursor-pointer"
            >
              {t("exploreButton")} →
            </Button>
          </div>
          <Categories />
        </div>
      </div>
    </section>
  );
}
