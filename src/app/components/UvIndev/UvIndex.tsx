"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { uvIndexIcon } from "@/app/utils/icons";
import { uvIndexCategory } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

function UvIndex() {
    const { uvIndex } = useGlobalContext();

    if (!uvIndex || !uvIndex?.daily) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const { uv_index_max } = uvIndex.daily;

    const uvIndexMax = uv_index_max ? uv_index_max[0] : 0;

    return (
        <div
            className="uv p-4 h-[12rem] border rounded-lg 
                        flex flex-col gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
            <h2 className=" flex gap-2 font-medium">{uvIndexIcon} Uv Index</h2>
            <div className="flex flex-col gap-4">
                <p className="flex items-center gap-2 text-2xl">
                    {uvIndexMax}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({uvIndexCategory(uvIndexMax).label})
                    </span>
                </p>

                <Progress value={(uvIndexMax / 14) * 100} max={14} className="progress" />

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {uvIndexCategory(uvIndexMax).description}
                </p>
            </div>
        </div>
    );
}

export default UvIndex;
