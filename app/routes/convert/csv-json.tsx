import React, { useState } from "react";
import { Prism } from "@mantine/prism";
import { parse } from "papaparse"
import {Button, Container, Grid, NumberInput, Paper, SimpleGrid, Space, Stack, Text, Textarea} from "@mantine/core";
import {useClipboard} from "@mantine/hooks";
import {Check, Copy, Download, InfoCircle, Trash} from "tabler-icons-react";
import {useNotifications} from "@mantine/notifications";
import {isJson} from "~/routes/json/formatter";

const example = `Username;Identifier;First name;Last name
booker12;9012;Rachel;Booker
grey07;2070;Laura;Grey
johnson81;4081;Craig;Johnson
jenkins46;9346;Mary;Jenkins
smith79;5079;Jamie;Smith`


export default function CsvJson() {
    const notifications = useNotifications();
    const [text, setText] = useState("");
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
                                    onClick={() => clipboard.copy(JSON.stringify(parse(text.trim(), {header: true}).data, null, numSpaces))}
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
                                            const blob = new Blob([JSON.stringify(parse(text.trim(), {header: true}).data, null, numSpaces)], {type: "application/json"});
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
                                    onClick={() => setText(example)}
                                    children={"Example"}
                                    fullWidth
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={<Trash/>}
                                    color={"red"}
                                    onClick={() => setText("")}
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
                            placeholder={`Enter CSV to Convert`}
                        />
                    </Stack>
                </Paper>
                <Paper shadow="xs" p="md" withBorder>
                    <Prism
                        noCopy
                        children={ JSON.stringify(parse(text.trim(), {header: true}).data, null, numSpaces) }
                        language={"json"}
                        withLineNumbers
                    />
                </Paper>
            </SimpleGrid>
        </Container>
    )
}
