"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    clearIcon,
    cloudyIcon,
    drizzleIcon,
    rainIcon,
    snowIcon,
    windIcon,
} from "@/app/utils/icons";

function DailyForecast() {
    const { fiveDayForecast } = useGlobalContext();

    const { list } = fiveDayForecast || [];

    // Check if airQuality data is available
    if (!fiveDayForecast || !list || list.length === 0) {
        return <Skeleton className="h-[12rem] w-full col-span-full md:col-span-2" />;
    }

    const dailyForecast = list.map(
        (item: { dt: number; main: { temp: number }; weather: [{ main: string }] }) => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
            });
            const hour = date.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            const temperature = kelvinToCelsius(item.main.temp);
            const weatherMain = item.weather?.[0]?.main;

            return {
                day,
                hour,
                temperature,
                weatherMain,
            };
        }
    );

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
            className="w-full col-span-full md:col-span-2 p-4 md:p-6 h-[12rem] border rounded-lg 
                        flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 
                        dark:from-slate-800 dark:to-slate-900 shadow-lg dark:shadow-slate-900/20 
                        hover:shadow-xl transition-all duration-300 border-blue-200/50 dark:border-slate-700/50
                        overflow-hidden"
        >
            <div className="w-full max-w-full relative">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full relative"
                >
                    <CarouselContent className="-ml-2 md:-ml-3">
                        {dailyForecast?.map(
                            (
                                forecast: {
                                    day: string;
                                    hour: string;
                                    temperature: number;
                                    weatherMain: string;
                                },
                                index: number
                            ) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-2 md:pl-3 basis-1/3 md:basis-1/4 lg:basis-1/5"
                                >
                                    <div
                                        className="flex flex-col items-center text-center p-2 md:p-3 rounded-lg 
                                                  bg-white/70 dark:bg-slate-700/60 backdrop-blur-sm 
                                                  hover:bg-white/90 dark:hover:bg-slate-600/70 
                                                  border border-white/40 dark:border-slate-600/40
                                                  transition-all duration-200 hover:scale-105 hover:shadow-lg
                                                  hover:border-blue-300/60 dark:hover:border-slate-500/60 relative"
                                    >
                                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                                            {forecast.day}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 md:mb-3">
                                            {forecast.hour}
                                        </p>
                                        <div
                                            className="text-2xl md:text-3xl mb-2 md:mb-3 flex items-center justify-center h-8 md:h-10 
                                                      filter drop-shadow-sm"
                                        >
                                            {getIcon(forecast.weatherMain)}
                                        </div>
                                        <p className="text-base md:text-lg font-bold text-slate-800 dark:text-white">
                                            {forecast.temperature}°
                                        </p>
                                    </div>
                                </CarouselItem>
                            )
                        )}
                    </CarouselContent>
                    <CarouselPrevious
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-5 
                                               bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm 
                                               hover:bg-white dark:hover:bg-slate-600
                                               border border-blue-200/60 dark:border-slate-600/60
                                               shadow-md hover:shadow-lg transition-all duration-200
                                               w-6 h-6 md:w-8 md:h-8"
                    />
                    <CarouselNext
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-5 
                                            bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm 
                                            hover:bg-white dark:hover:bg-slate-600
                                            border border-blue-200/60 dark:border-slate-600/60
                                            shadow-md hover:shadow-lg transition-all duration-200
                                            w-6 h-6 md:w-8 md:h-8"
                    />
                </Carousel>
            </div>
        </div>
    );
}

export default DailyForecast;
