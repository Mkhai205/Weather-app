"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { visibilityIcon } from "@/app/utils/icons";
import { visibilityDescription } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "react-i18next";

function Visibility() {
    const { forecast } = useGlobalContext();
    const { t } = useTranslation();

    if (!forecast || !forecast?.main || !forecast?.visibility) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const { visibility } = forecast;

    const visibilityInKm = Math.round(visibility / 1000);

    return (
        <div
            className="feelsLike p-4 h-[12rem] border rounded-lg
                                flex flex-col justify-between gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <h2 className=" flex gap-2 font-medium">
                {visibilityIcon} {t("weather.visibility")}
            </h2>{" "}
            <p className="text-2xl text-center">{visibilityInKm} Km</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {visibilityDescription(visibilityInKm)}
            </p>
        </div>
    );
}

export default Visibility;
