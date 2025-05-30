"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { calendarIcon } from "@/app/utils/icons";
import { kelvinToCelsius, unixToDay } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

function FiveDayForecast() {
    const { fiveDayForecast } = useGlobalContext();
    const { t } = useTranslation();

    const { city, list } = fiveDayForecast;

    if (!city || !list) {
        return <Skeleton className="w-full h-full" />;
    }
    const processData = (
        dailyData: { main: { temp_min: number; temp_max: number }; dt: number }[],
        timezone: number
    ) => {
        let minTemperature = Number.MAX_VALUE;
        let maxTemperature = Number.MIN_VALUE;

        dailyData.forEach((day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
            if (day.main.temp_min < minTemperature) {
                minTemperature = day.main.temp_min;
            }
            if (day.main.temp_max > maxTemperature) {
                maxTemperature = day.main.temp_max;
            }
        });

        return {
            minTemperature: kelvinToCelsius(minTemperature),
            maxTemperature: kelvinToCelsius(maxTemperature),
            day: unixToDay(dailyData[0].dt, timezone),
        };
    };

    const daylyForecastData = [];

    for (let i = 0; i < list.length; i += 8) {
        const dailyData = list.slice(i, i + 5);
        daylyForecastData.push(processData(dailyData, city.timezone));
    }

    return (
        <div
            className="p-6 border rounded-lg flex flex-col gap-4 bg-white
                    dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <div className="flex flex-col gap-2">
                {" "}
                <h2 className="flex items-center gap-2 font-medium text-lg">
                    {calendarIcon} {t("weather.fiveDayForecast")} {city?.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("weather.dailyForecast")}
                </p>
            </div>
            <div className="flex flex-col justify-between gap-4">
                {daylyForecastData.map((day, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-evenly p-2 border-b-2 dark:bg-dark-grey shadow-sm dark:shadow-none"
                    >
                        <p className="text-xl min-w-[3.5rem]">{day.day}</p>{" "}
                        <p className="text-sm flex justify-between">
                            <span>({t("weather.low")})</span>
                            <span>({t("weather.high")})</span>
                        </p>
                        <div className="flex flex-1 items-center justify-between gap-2">
                            <p className="font-bold text-blue-400">{day.minTemperature}°</p>
                            <div className="temperature flex flex-1 w-full h-2 rounded-lg"></div>
                            <p className="font-bold text-red-400">{day.maxTemperature}°</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FiveDayForecast;
