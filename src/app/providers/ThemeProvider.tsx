"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GlobalContextProvider } from "../context/globalContext";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <GlobalContextProvider>{children}</GlobalContextProvider>;
    }

    return (
        <NextThemesProvider {...props}>
            <GlobalContextProvider>{children}</GlobalContextProvider>
        </NextThemesProvider>
    );
}
