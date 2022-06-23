import {Textarea, Container, NumberInput, SimpleGrid, Stack, Paper, Group, Button, Grid} from "@mantine/core";
import { Prism } from '@mantine/prism';
import React, { useState } from "react";
import { useClipboard } from "@mantine/hooks";
import {Check, Copy, Download, InfoCircle, Trash} from "tabler-icons-react";
import {useNotifications} from "@mantine/notifications";

export function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export default function JsonFormatter() {
    const notifications = useNotifications();
    const [ text, setText ] = useState(JSON.stringify({foo: "bar"}));
    const [ numSpaces, setNumSpaces ] = useState(2);
    const clipboard = useClipboard({ timeout: 500 });

    return (
        <Container>
            <SimpleGrid cols={2} spacing={"md"} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                <Paper shadow="xs" p="md" withBorder>
                    <Stack spacing={"md"}>
                        <Grid columns={2} gutter={"md"} grow justify={"center"}>
                            <Grid.Col span={2}>
                                <NumberInput
                                    defaultValue={2}
                                    min={0}
                                    max={10}
                                    onChange={(value: number | undefined) => setNumSpaces(value as number)}
                                    formatter={(value) => value + " Spaces"}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={clipboard.copied ? <Check/> : <Copy/>}
                                    onClick={() => clipboard.copy(isJson(text) ? `${JSON.stringify(JSON.parse(text.trim()), null, numSpaces)}` : "{}")}
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
                                        if (isJson(text)) {
                                            const blob = new Blob([isJson(text) ? `${JSON.stringify(JSON.parse(text.trim()), null, numSpaces)}` : "{}"], {type: "application/json"});
                                            const url = URL.createObjectURL(blob);
                                            const link = document.createElement("a");
                                            link.href = url;
                                            link.download = `output.json`;
                                            document.body.appendChild(link);
                                            return link.click();
                                        } else {
                                            return notifications.showNotification({
                                                title: "Error",
                                                message: "Not a valid JSON string",
                                                color: "red",
                                                autoClose: 5000
                                            })
                                        }
                                    }}
                                    children={'Download'}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={<InfoCircle/>}
                                    onClick={() => setText(JSON.stringify({foo: "bar"}))}
                                    children={"Example"}
                                    fullWidth
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={<Trash/>}
                                    color={"red"}
                                    onClick={() => setText("{}")}
                                    children={"Clear"}
                                    fullWidth
                                />
                            </Grid.Col>
                        </Grid>
                        <Textarea
                            autosize
                            minRows={6}
                            radius={"md"}
                            value={text}
                            onChange={(value) => setText(value.target.value)}
                            placeholder={`Enter JSON to format`}
                        />
                    </Stack>
                </Paper>
                <Paper shadow="xs" p="md" withBorder>
                    <Prism
                        noCopy
                        children={isJson(text) ? `${JSON.stringify(JSON.parse(text.trim()), null, numSpaces)}` : "{}"}
                        language={"json"}
                        withLineNumbers
                    />
                </Paper>
            </SimpleGrid>
        </Container>
    );
}
