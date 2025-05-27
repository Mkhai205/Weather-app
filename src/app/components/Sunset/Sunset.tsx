"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { sunriseIcon, sunsetIcon } from "@/app/utils/icons";
import { unixToTime } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Sunset() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.sys || !forecast.sys?.sunset) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const timezone = forecast?.timezone || 0;
    const sunsetTime = unixToTime(forecast?.sys?.sunset, timezone);
    const sunriseTime = unixToTime(forecast?.sys?.sunrise, timezone);

    return (
        <div
            className="sunset p-4 h-[12rem] border rounded-lg 
                        flex flex-col gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium">{sunsetIcon} Sunset</h2>
                <p className="pt-4 text-2xl">{sunsetTime}</p>
            </div>

            <div className="bottom">
                <h2 className="flex items-center gap-2 font-medium">{sunriseIcon} Sunrise</h2>
                <p className="pt-4 text-2xl">{sunriseTime}</p>
            </div>
        </div>
    );
}

export default Sunset;
