import React from "react";
import {UnstyledButton, Center, Divider, Navbar, Text, Stack, ScrollArea, Group, ThemeIcon} from "@mantine/core";
import { Link } from "@remix-run/react"
import { redirects } from "../../../../public/links";
import * as icons from "tabler-icons-react";

export default function ShellNavbar () {
    return (
        <Navbar p={"xs"} width={{base: 300}}>
            <Navbar.Section>
                <Center>
                    <Text<typeof Link> component={Link} to={"/"} variant={"gradient"} size={"md"} weight={"bold"} gradient={{from: "indigo", to: "cyan", deg: 45}} style={{fontSize: 24, fontFamily: 'Greycliff CF, sans-serif'}}>
                        Dev Utilities
                    </Text>
                </Center>
            </Navbar.Section>
            <Divider/>
            <Navbar.Section
                grow
                component={ScrollArea}
                mx="-xs"
                px="xs"
                mt={"xs"}
            >
                {
                    redirects.map((group, index) => {
                        if (group.links.filter((item) => item.enabled).length > 0) {
                            return (
                                <>
                                    <Divider key={index} label={group.sectionTitle} labelPosition="center"/>
                                    <Stack key={index} spacing={"sm"}>
                                        {
                                            group.links.map((item, index) => {
                                                if (item.enabled) {
                                                    return (
                                                        <UnstyledButton
                                                            key={`${item.title}-${index}`}
                                                            rel="noopener noreferrer"
                                                            component={"a"}
                                                            href={item.href}
                                                            sx={(theme) => ({
                                                                display: 'block',
                                                                width: '100%',
                                                                padding: theme.spacing.xs,
                                                                borderRadius: theme.radius.md,
                                                                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                                                                '&:hover': {
                                                                    backgroundColor:
                                                                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                                                },
                                                            })}
                                                        >
                                                            <Group
                                                                key={`${item.title}-${index}`}
                                                            >
                                                                <ThemeIcon
                                                                    variant="light"
                                                                    key={`${item.title}-${index}`}
                                                                >
                                                                    {/* @ts-ignore */}
                                                                    {React.createElement(icons[item.icon], {})}
                                                                </ThemeIcon>
                                                                <Text key={`${item.title}-${index}`} size="sm">{item.title}</Text>
                                                            </Group>
                                                        </UnstyledButton>
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
