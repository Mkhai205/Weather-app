"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { github } from "../utils/icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";
// import { useGlobalContext } from "../context/globalContext";

function Navbar() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="w-full py-4 flex items-center justify-between">
            <div className="left"></div>
            <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
                {" "}
                <SearchDialog />
                <div className="btn-group flex items-center gap-2">
                    <LanguageSelector />
                    <ThemeDropdown />
                    <Button
                        className="source-code flex items-center gap-2"
                        onClick={() => {
                            router.push("https://github.com/Mkhai205/Weather-app");
                        }}
                    >
                        {github} {t("navbar.sourceCode")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
