import React, {useState} from "react";
import { AppShell as MantineAppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import ShellNavbar from "~/components/layout/Navbar";
import ShellFooter from "~/components/layout/Footer";
import {NotificationsProvider} from "@mantine/notifications";

export default function Layout ({children}: { children: React.ReactNode }): JSX.Element {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    return (
        <>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{ colorScheme }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <MantineAppShell
                        fixed
                        navbarOffsetBreakpoint={"sm"}
                        navbar={ <ShellNavbar/> }
                    >
                        <NotificationsProvider>
                            {children}
                        </NotificationsProvider>
                    </MantineAppShell>
                    <ShellFooter/>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    )
}
