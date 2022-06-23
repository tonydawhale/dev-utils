import React, { useState } from "react";
import {Container, Group, Paper, SimpleGrid, Stack, Textarea, SegmentedControl, Center, Box, Button, Grid, Select} from "@mantine/core";
import {useClipboard} from "@mantine/hooks";
import {Check, Copy, Download, InfoCircle, Trash} from "tabler-icons-react";

export default function Base64String () {
    const [value, setValue] = useState("");
    const [direction, setDirection] = useState<"encode" | "decode">("encode");
    const clipboard = useClipboard({ timeout: 500 });

    return (
        <Container>
            <SimpleGrid cols={2} spacing={"md"} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                <Paper shadow="xs" p="md" withBorder>
                    <Stack spacing={"md"}>
                        <Grid columns={2} gutter={"md"} grow justify={"center"}>
                            <Grid.Col span={2}>
                                <SegmentedControl
                                    value={direction}
                                    onChange={(e) => {
                                        setDirection(e as "encode" | "decode")
                                        setValue(direction === "encode" ? btoa(value) : atob(value))
                                    }}
                                    data={[
                                        {
                                            value: 'encode',
                                            label: (
                                                <Center>
                                                    <Box>Encode</Box>
                                                </Center>
                                            )
                                        },
                                        {
                                            value: 'decode',
                                            label: (
                                                <Center>
                                                    <Box>Decode</Box>
                                                </Center>
                                            )
                                        },
                                    ]}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={clipboard.copied ? <Check/> : <Copy/>}
                                    onClick={() => clipboard.copy(direction === "encode" ? btoa(value) : atob(value))}
                                    children={clipboard.copied ? 'Copied' : 'Copy Result'}
                                    color={clipboard.copied ? 'teal' : 'blue'}
                                    fullWidth
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={<Download/>}
                                    fullWidth
                                    onClick={() => {
                                        const blob = new Blob([direction === "encode" ? btoa(value) : atob(value)], {type: "text/plain"});
                                        const url = URL.createObjectURL(blob);
                                        const link = document.createElement("a");
                                        link.href = url;
                                        link.download = `output.txt`;
                                        document.body.appendChild(link);
                                        return link.click();
                                    }}
                                    children={'Download'}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={<InfoCircle/>}
                                    onClick={() => setValue(direction === "encode" ? "This is a secret message" : btoa("This is a secret message"))}
                                    children={"Example"}
                                    fullWidth
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={<Trash/>}
                                    color={"red"}
                                    onClick={() => setValue("")}
                                    children={"Clear"}
                                    fullWidth
                                />
                            </Grid.Col>
                        </Grid>
                        <Textarea
                            autosize
                            minRows={6}
                            radius={"md"}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={`Enter text to ${direction === "encode" ? "encode" : "decode"}`}
                        />
                    </Stack>
                </Paper>
                <Paper shadow="xs" p="md" withBorder>
                    <Textarea
                        autosize
                        minRows={13}
                        radius={"md"}
                        readOnly
                        value={direction === "encode" ? btoa(value) : atob(value)}
                        placeholder={direction === "encode" ? "Encoded text" : "Decoded text"}
                    />
                </Paper>
            </SimpleGrid>
        </Container>
    )
}
