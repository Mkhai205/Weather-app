"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { windIcon } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useTranslation } from "react-i18next";

function Wind() {
    const { forecast } = useGlobalContext();
    const { t } = useTranslation();

    const windSpeed = forecast?.wind?.speed || 0;
    const windDirection = forecast?.wind?.deg || 0;

    if (!forecast || !forecast?.wind) {
        return <Skeleton className="h-[12rem] w-full" />;
    }
    return (
        <div className="p-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none">
            <h2 className="flex items-center gap-2 font-medium">
                {windIcon} {t("weather.wind")}
            </h2>

            <div className="compass relative flex items-center justify-center flex-1">
                <div className="image relative">
                    <Image
                        src="/compass_body.svg"
                        alt="Wind Compass"
                        width={110}
                        height={110}
                        className="opacity-80"
                        style={{
                            height: "100%",
                            width: "auto",
                        }}
                    />{" "}
                    <Image
                        className="absolute top-0 left-[50%] transition-all duration-900 ease-in-out dark:invert"
                        src="/compass_arrow.svg"
                        alt="Wind Compass Arrow"
                        width={11}
                        height={11}
                        style={{
                            transform: `translateX(-50%) rotate(${windDirection}deg)`,
                            height: "100%",
                            width: "auto",
                        }}
                    />
                </div>

                {/* Wind speed display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg font-bold dark:text-white">{Math.round(windSpeed)}</p>
                        <p className="text-xs text-muted-foreground">m/s</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wind;
