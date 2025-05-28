"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermometerIcon } from "@/app/utils/icons";
import { airQualityDescription } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

function AirPollution() {
    const { airQuality } = useGlobalContext();

    // Check if airQuality data is available
    if (
        !airQuality ||
        !airQuality.list ||
        airQuality.list.length === 0 ||
        !airQuality.list[0].main
    ) {

        
        return <Skeleton className="h-[12rem] w-full col-span-full md:col-span-2" />;
    }
    
    const airQualityIndex = airQuality.list[0].main.aqi * 10;
    const airQualityDescriptionText = airQualityDescription(airQualityIndex || 1000);

    return (
        <div
            className="air-pollution col-span-full md:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg 
                        flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <h2 className="flex items-center gap-2 font-medium">{thermometerIcon} Air Pollution</h2>
            <Progress value={airQualityIndex} max={100} className="progress" />
            <p>Air quality is {airQualityDescriptionText}</p>
        </div>
    );
}

export default AirPollution;
