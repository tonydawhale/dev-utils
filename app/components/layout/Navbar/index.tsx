import React from "react";
import { Button, Center, Divider, Navbar, Text } from "@mantine/core";
import { Link } from "@remix-run/react"

const links = [
    [
        {
            title: "JSON Formatter",
            href: "/json"
        }
    ]
]

export default function ShellNavbar () {
    return (
        <Navbar p={"md"} width={{sm: 250}}>
            <Navbar.Section>
                <Center>
                    <Text<typeof Link> component={Link} to={"/"} variant={"gradient"} size={"md"} weight={"bold"} gradient={{from: "indigo", to: "cyan", deg: 45}} style={{fontSize: 24, fontFamily: 'Greycliff CF, sans-serif'}}>
                        Dev Utilities
                    </Text>
                </Center>
            </Navbar.Section>
            <Divider/>
            {
                links.map((group, index) =>
                    <Navbar.Section key={index} p={"md"}>
                        {
                            group.map((item) =>
                                <Button
                                    rel="noopener noreferrer"
                                    component={"a"}
                                    href={item.href}
                                    fullWidth
                                    key={item.title}
                                >
                                    {item.title}
                                </Button>
                            )
                        }
                    </Navbar.Section>
                )
            }
        </Navbar>
    )
}
