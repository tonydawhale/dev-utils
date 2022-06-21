import { Card, Text, ThemeIcon, Group, useMantineTheme } from '@mantine/core';
import React from "react";
import * as icons from "tabler-icons-react";

export function LandingPageCard(
    {title, description, href, icon}: {title: string, description: string, href: string, icon: string}) {
    const theme = useMantineTheme()

    return (
        <Card
            shadow="sm"
            p="xl"
            component="a"
            href={href}
        >
            <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                <ThemeIcon variant="light">
                    {/* @ts-ignore */}
                    {React.createElement(icons[icon], {})}
                </ThemeIcon>
                <Text weight={500} size="lg">
                    {title}
                </Text>
            </Group>

            <Text size="sm">
                {description}
            </Text>

        </Card>
    )
}
