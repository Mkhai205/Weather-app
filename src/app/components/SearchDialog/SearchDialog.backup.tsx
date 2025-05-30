"use client";
import { useGlobalContext, useGlob                    <DialogDescription>
                        {t("navbar.search")}
                    </DialogDescription>
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput
                            value={searchInput}
                            onChangeCapture={handleInput}
                            placeholder={t("navbar.search")}
                        />
                        <ul className="px-3 pb-2">
                            <p className="p-2 text-sm text-muted-foreground">{t("common.suggestions")}</p>date } from "@/app/context/globalContext";
import { commandIcon, searchIcon } from "@/app/utils/icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function SearchDialog() {
    const { geoCodedList, searchInput, handleInput } = useGlobalContext();
    const { setActiveCityCoords } = useGlobalContextUpdate();
    const { t } = useTranslation();
    const [hoveredIndex, setHoveredIndex] = useState<number>();
    const [open, setOpen] = useState(false);

    const getClickedCoorrds = (lat: number, lon: number) => {
        setActiveCityCoords({ lat, lon });
        setOpen(false);
    };
    return (
        <div className="search-btn">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border inline-flex items-center justify-center text-sm font-medium 
                                hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
                    >                        {searchIcon}
                        <p className="text-sm text-muted-foreground overflow-hidden whitespace-nowrap">
                            {t("navbar.search")}
                        </p>
                        <div
                            className="command dark:bg-[#262626] bg-slate-200 py-0.5 px-2 flex items-center 
                                        justify-between gap-2 rounded-md ml-4 sm:ml-8 md:ml-16 lg:ml-24"
                        >
                            {commandIcon}
                            <span className="text-[9px]">F</span>
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0">
                    <DialogTitle className="sr-only">Search</DialogTitle>
                    <DialogDescription className="sr-only">
                        Search for weather information and locations
                    </DialogDescription>
                    <Command className="rounded-lg border shadow-md">                        <CommandInput
                            value={searchInput}
                            onChangeCapture={handleInput}
                            placeholder={t("navbar.search")}
                        />
                        <ul className="px-3 pb-2">
                            <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

                            {geoCodedList?.length > 0 ? (
                                geoCodedList.map(
                                    (
                                        item: {
                                            name: string;
                                            country: string;
                                            state: string;
                                            lat: number;
                                            lon: number;
                                        },
                                        index: number
                                    ) => {
                                        const { country, state, name } = item;
                                        return (
                                            <li
                                                key={index}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onClick={() => {
                                                    getClickedCoorrds(item.lat, item.lon);
                                                }}
                                                className={`flex items-center gap-2 cursor-pointer p-4 rounded-md ${
                                                    hoveredIndex === index ? "bg-accent" : ""
                                                }`}
                                            >
                                                <p className="text-sm font-medium">{name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {state ? `${state}, ` : ""}
                                                    {country}
                                                </p>
                                            </li>
                                        );
                                    }
                                )                            ) : (
                                <p className="p-4 rounded-md text-md font-medium">
                                    {t("common.noAvailableData")}
                                </p>
                            )}
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SearchDialog;
