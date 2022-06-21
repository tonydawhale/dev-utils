import {Button, Card, Image, Text, ThemeIcon, Title} from '@mantine/core';
import React from "react";
import * as icons from "tabler-icons-react";

export function LandingPageCard(
    {title, description, href, icon}: {title: string, description: string, href: string, icon: string}) {
    return (
        // <Card
        //     shadow="sm"
        //     p="xl"
        //     component="a"
        //     href={href}
        //     target="_blank"
        // >
        //     <Card.Section>
        //         <ThemeIcon variant="light">
        //             {/* @ts-ignore */}
        //             {React.createElement(icons[icon], {})}
        //         </ThemeIcon>
        //     </Card.Section>
        //     <Card.Section>
        //         <Title>{title}</Title>
        //     </Card.Section>
        //     <Card.Section>
        //         <Text>{description}</Text>
        //     </Card.Section>
        // </Card>
        <Button>
            {title}
        </Button>
    )
}
