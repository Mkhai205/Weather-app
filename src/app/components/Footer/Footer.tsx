"use client";
import React from "react";

function Footer() {
    return (
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
    );
}

export default Footer;
