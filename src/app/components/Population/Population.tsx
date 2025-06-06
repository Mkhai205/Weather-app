"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { populationIcon } from "@/app/utils/icons";
import { formatPopulation } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

function Population() {
    const { fiveDayForecast } = useGlobalContext();
    const { t } = useTranslation();

    const population: number = fiveDayForecast?.city?.population;
    const cityName: string = fiveDayForecast?.city?.name;

    if (!population || !cityName || !fiveDayForecast) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    return (
        <div
            className="population p-4 h-[12rem] border rounded-lg
                        flex flex-col justify-between gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <h2 className=" flex gap-2 font-medium">
                {populationIcon} {t("weather.population")}
            </h2>{" "}
            <div className="flex gap-2 items-center">
                <p className="flex items-center gap-2 text-2xl">
                    {formatPopulation(population)}
                    <span className="text-sm text-gray-500 dark:text-gray-400">({t("weather.people")})</span>
                </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                 {t("common.population")} {cityName}
            </p>
        </div>
    );
}

export default Population;
