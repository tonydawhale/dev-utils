import React, {useState} from "react";
import {Button, Container, Grid, Group, Paper, Select, SimpleGrid, Skeleton, Text, Textarea, TextInput, Title, useMantineTheme} from "@mantine/core";
import {useNotifications} from "@mantine/notifications";
import {Prism} from "@mantine/prism";

const PRIMARY_COL_HEIGHT = 300;

export default function Base64String () {
    const theme = useMantineTheme()
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2

    return (
        <Container>
            <SimpleGrid cols={2} spacing={"md"} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                <Grid gutter={"md"}>
                    <Grid.Col>
                        <Paper shadow="xs" p="md" withBorder>
                            <Group>
                                <Select data={["1", "2", "3"]}/>
                            </Group>

                        </Paper>
                    </Grid.Col>
                    {/*<Grid.Col span={6}>*/}
                    {/*    <TextInput*/}
                    {/*        height={SECONDARY_COL_HEIGHT}*/}
                    {/*        radius={"md"}*/}
                    {/*    />*/}
                    {/*</Grid.Col>*/}
                    <Grid.Col>
                        <TextInput
                            height={SECONDARY_COL_HEIGHT}
                            radius={"md"}
                        />
                    </Grid.Col>
                </Grid>
                <Textarea
                    autosize
                    minRows={10}
                    // height={PRIMARY_COL_HEIGHT}
                    radius={"md"}
                />
            </SimpleGrid>
        </Container>
    )
}
