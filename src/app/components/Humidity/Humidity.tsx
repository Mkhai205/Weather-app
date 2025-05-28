"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { humidityIcon } from "@/app/utils/icons";
import { humidityDescription } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Humidity() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const { humidity } = forecast?.main;

    return (
        <div
            className="feelsLike p-4 h-[12rem] border rounded-lg
                                flex flex-col justify-between gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <h2 className=" flex gap-2 font-medium">{humidityIcon} Humidity</h2>
            <p className="text-2xl text-center">{humidity}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {humidityDescription(humidity)}
            </p>
        </div>
    );
}

export default Humidity;
