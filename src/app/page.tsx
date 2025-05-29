import { Skeleton } from "@/components/ui/skeleton";
import AirPollution from "./components/AirPollution/AirPollution";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import FeelsLike from "./components/FeelsLike/FeelsLike";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";
import Humidity from "./components/Humidity/Humidity";
import Mapbox from "./components/Mapbox/Mapbox";
import Navbar from "./components/Navbar";
import Population from "./components/Population/Population";
import Pressure from "./components/Pressure/Pressure";
import Sunset from "./components/Sunset/Sunset";
import Temperature from "./components/Temperature/Temperature";
import UvIndex from "./components/UvIndex/UvIndex";
import Visibility from "./components/Visibility/Visibility";
import Wind from "./components/Wind/Wind";
import defaultStates from "./utils/defaultStates";

export default function Home() {
    return (
        <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
            <Navbar />
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
                    <Temperature />
                    <FiveDayForecast />
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AirPollution />
                        <Sunset />
                        <Wind />
                        <DailyForecast />
                        <UvIndex />
                        <Population />
                        <FeelsLike />
                        <Humidity />
                        <Visibility />
                        <Pressure />
                    </div>
                    <div className="map-box flex gap-4">
                        <Mapbox />
                        <div className="states flex flex-col gap-4 flex-1">
                            <h2 className="flex items-center justify-center gap-2 font-medium text-lg">
                                Top Large Cities
                            </h2>

                            <div className="flex flex-1 flex-col justify-between">
                                {defaultStates?.length > 0 ? (
                                    defaultStates.map((state, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                        >
                                            <p className="px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
                                                <span className="font-medium">{state.name}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                                    {state.state}
                                                </span>
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <Skeleton className="w-full h-full" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="flex justify-center p-8">
                <p className="text-sm flex items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                        Made with ❤️ by{" "}
                        <a href="https://github.com/Mkhai205" className="text-blue-300 font-bold">
                            Mkhai205
                        </a>
                    </span>
                </p>
            </footer>
        </main>
    );
}
