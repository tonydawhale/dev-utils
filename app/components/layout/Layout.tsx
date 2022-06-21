import React, {useState} from "react";
import { AppShell as MantineAppShell, ColorScheme, MantineProvider } from "@mantine/core";
import ShellNavbar from "~/components/layout/Navbar";
import ShellFooter from "~/components/layout/Footer";

export default function Layout ({children}: { children: React.ReactNode }): JSX.Element {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    return (
        <>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
            >
                <MantineAppShell
                    fixed
                    navbarOffsetBreakpoint={"sm"}
                    navbar={ <ShellNavbar/> }
                >
                    {children}
                </MantineAppShell>
                <ShellFooter/>
            </MantineProvider>
        </>
    )
}
