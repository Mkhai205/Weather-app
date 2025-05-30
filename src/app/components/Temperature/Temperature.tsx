"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import {
    clearIcon,
    cloudyIcon,
    drizzleIcon,
    navigateIcon,
    rainIcon,
    snowIcon,
    windIcon,
} from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n";

function Temperature() {
    // State
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");
    const { t } = useTranslation();
    const { forecast } = useGlobalContext();

    const main = forecast?.main;
    const timezone = forecast?.timezone || 0;
    const name = forecast?.name;
    const weather = forecast?.weather;

    // Live time update
    useEffect(() => {
        // update time every second
        const interval = setInterval(() => {
            // Set the locale based on the current language
            moment.locale(i18n.language);
            const localMoment = moment().utcOffset(timezone / 60);
            // custom format: 24 hours format
            const formattedTime = localMoment.format("HH:mm:ss");
            // custom format: day of the week
            const formattedDay = localMoment.format("dddd");

            setLocalTime(formattedTime);
            setCurrentDay(formattedDay);
        }, 1000);

        // clear interval on component unmount
        return () => clearInterval(interval);
    }, [timezone]);

    const temperature = kelvinToCelsius(main?.temp || 0);
    const minTemperature = kelvinToCelsius(main?.temp_min || 0);
    const maxTemperature = kelvinToCelsius(main?.temp_max || 0);

    if (!forecast || !weather) {
        return <Skeleton className="h-[25rem] w-full" />;
    }

    const { main: weatherMain, description: weatherDescription } = weather[0];

    const getIcon = (weatherMain: string) => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rainIcon;
            case "Wind":
                return windIcon;
            case "Snow":
                return snowIcon;
            case "Clear":
                return clearIcon;
            case "Clouds":
                return cloudyIcon;
            default:
                return clearIcon;
        }
    };

    return (
        <div
            className="p-6 border rounded-lg flex flex-col justify-between 
                    dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <p className="flex justify-between items-center">
                <span className="font-medium">{currentDay}</span>
                <span className="font-medium">{localTime}</span>
            </p>
            <p className="pt-2 font-bold flex gap-1">
                <span>{name}</span>
                <span>{navigateIcon}</span>
            </p>
            <p className="py-10 text-9xl font-bol self-center">{temperature}°</p>

            <div>
                <div>
                    <span>{getIcon(weatherMain)}</span>
                    <p className="pt-2 capitalize text-lg font-medium">{weatherDescription}</p>
                </div>{" "}
                <p className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                    <span>
                        {t("weather.low")}: {minTemperature}°
                    </span>
                    <span>
                        {t("weather.high")}: {maxTemperature}°
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Temperature;
