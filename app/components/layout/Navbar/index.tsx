import React from "react";
import {Button, Center, Divider, Navbar, Text, Stack, ScrollArea} from "@mantine/core";
import { Link } from "@remix-run/react"
import { redirects } from "../../../../public/links";

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
            <Navbar.Section p={"md"} grow component={ScrollArea} mx="-xs" px="xs">
                {
                    redirects.map((group, index) => {
                        if (group.links.filter((item) => item.enabled).length > 0) {
                            return (
                                <>
                                    <Divider key={index} label={group.sectionTitle} labelPosition="center"/>
                                    <Stack spacing={"sm"}>
                                        {
                                            group.links.map((item, index) => {
                                                if (item.enabled) {
                                                    return (
                                                        <Button
                                                            rel="noopener noreferrer"
                                                            component={"a"}
                                                            href={item.href}
                                                            fullWidth
                                                            key={index}
                                                            variant={"outline"}
                                                        >
                                                            {item.title}
                                                        </Button>
                                                    )
                                                }
                                            })
                                        }
                                    </Stack>
                                </>
                            )
                        }
                    })
                }
            </Navbar.Section>
        </Navbar>
    )
}
