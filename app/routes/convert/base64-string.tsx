import React, { useState } from "react";
import {Container, Group, Paper, SimpleGrid, Stack, Textarea, SegmentedControl, Center, Box, Button} from "@mantine/core";
import {useClipboard} from "@mantine/hooks";

export default function Base64String () {
    const [value, setValue] = useState("");
    const [direction, setDirection] = useState<"encode" | "decode">("encode");
    const clipboard = useClipboard({ timeout: 500 });

    return (
        <Container>
            <SimpleGrid cols={2} spacing={"md"} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                <Stack spacing={"md"}>
                    <Paper shadow="xs" p="md" withBorder>
                        <Group>
                            <SegmentedControl
                                value={direction}
                                onChange={(e) => setDirection(e as "encode" | "decode")}
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
                            <Button
                                color={clipboard.copied ? 'teal' : 'blue'}
                                onClick={() => clipboard.copy(direction === "encode" ? btoa(value) : atob(value))}
                                children={clipboard.copied ? 'Copied' : 'Copy Result'}
                            />
                        </Group>
                    </Paper>
                        <Textarea
                            autosize
                            minRows={6}
                            radius={"md"}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={`Enter text to ${direction === "encode" ? "encode" : "decode"}`}
                        />
                </Stack>
                <Textarea
                    autosize
                    minRows={10}
                    radius={"md"}
                    readOnly
                    value={direction === "encode" ? btoa(value) : atob(value)}
                    placeholder={direction === "encode" ? "Encoded text" : "Decoded text"}
                />
            </SimpleGrid>
        </Container>
    )
}
