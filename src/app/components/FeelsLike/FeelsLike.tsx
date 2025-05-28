"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { feelsLikeIcon } from "@/app/utils/icons";
import { feelsLikeDescription, kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FeelsLike() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const { feels_like, temp_min, temp_max } = forecast?.main;

    return (
        <div
            className="feelsLike p-4 h-[12rem] border rounded-lg
                                flex flex-col justify-between gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <h2 className=" flex gap-2 font-medium">{feelsLikeIcon} Feels Like</h2>{" "}
            <p className="text-2xl text-center">{kelvinToCelsius(feels_like)}°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {feelsLikeDescription(feels_like, temp_max, temp_min)}
            </p>
        </div>
    );
}

export default FeelsLike;
