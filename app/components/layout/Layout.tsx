import React, {useState} from "react";
import {Button, Footer, Navbar, AppShell as MantineAppShell, ColorScheme} from "@mantine/core";
import ShellNavbar from "~/components/layout/Navbar";
import ShellFooter from "~/components/layout/Footer";

export default function AppShell ({children}: { children: React.ReactNode }): JSX.Element {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    return (
        <>
            <MantineAppShell
                fixed
                navbarOffsetBreakpoint={"sm"}
                navbar={ <ShellNavbar/> }
                // footer={  }
            >
                {children}
            </MantineAppShell>
            <ShellFooter/>
        </>
    )
}
