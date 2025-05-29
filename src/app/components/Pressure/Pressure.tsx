"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { pressureIcon } from "@/app/utils/icons";
import { pressureDescription } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Pressure() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const { pressure } = forecast?.main;

    return (
        <div
            className="feelsLike p-4 h-[12rem] border rounded-lg
                        flex flex-col justify-between gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <h2 className=" flex gap-2 font-medium">{pressureIcon} Humidity</h2>
            <p className="text-2xl text-center">{pressure} hPa</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {pressureDescription(pressure)}
            </p>
        </div>
    );
}

export default Pressure;
