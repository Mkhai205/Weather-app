"use client";
import { Skeleton } from "@/components/ui/skeleton";
import defaultStates from "../../utils/defaultStates";
import { useGlobalContextUpdate } from "@/app/context/globalContext";
import { useTranslation } from "react-i18next";

function TopCity() {
    const { setActiveCityCoords } = useGlobalContextUpdate();
    const { t } = useTranslation();

    const getClickedCoorrds = (lat: number, lon: number) => {
        setActiveCityCoords({ lat, lon });
    };

    return (
        <div className="states flex flex-col gap-4 flex-1">
            <h2 className="flex items-center justify-center gap-2 font-medium text-lg">
                {t("common.topcities")}
            </h2>

            <div className="flex flex-1 flex-col justify-between gap-2">
                {defaultStates?.length > 0 ? (
                    defaultStates.map((state, index) => (
                        <div
                            key={index}
                            onClick={() => getClickedCoorrds(state.lat, state.lon)}
                            className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none 
                        hover:bg-gray-50 hover:border-blue-600 ease-in-out duration-150 dark:hover:bg-slate-700/50 transition-colors"
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
    );
}

export default TopCity;
