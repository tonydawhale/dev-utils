import * as uuid from 'uuid';
import {Button, Container, Grid, NumberInput, Paper, Select, SimpleGrid, Stack, Textarea, TextInput} from "@mantine/core";
import React, { useState } from "react";
import { useClipboard } from "@mantine/hooks";
import { Check, Copy, Download } from "tabler-icons-react";
import {useNotifications} from "@mantine/notifications";

declare type uuid = "v0" | "v1" | "v4"

const generateUuid = (type: uuid) => {
    if (type === "v0") {
        return uuid.NIL;
    }
    // @ts-ignore
    return uuid[type]();
}

const generateUuids = (type: uuid, amount: number) => {
    return Array.from({ length: amount }, () => generateUuid(type)).join("\n");
}

const getHexStrings = (input: string) => {
    const bytes = uuid.parse(input);

    // @ts-ignore
    return [...bytes].map((v) => v.toString(16).padStart(2, '0')).join(":")
}

export default function Uuid() {
    const notifications = useNotifications();
    const [inputUuid, setInputUuid] = useState('');
    const [uuidList, setUuidList] = useState('');
    const [generateUuidType, setGenerateUuidType] = useState<uuid>('v4');
    const [amountToGenerate, setAmountToGenerate] = useState(1);
    const clipboard = useClipboard({ timeout: 500 });

    return (
        <Container>
            <SimpleGrid cols={2} spacing={"md"} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                <Paper shadow="xs" p="md" withBorder>
                    <Stack spacing={"md"}>
                        <TextInput
                            label={"Your UUID"}
                            placeholder={"Enter a UUID"}
                            radius={"md"}
                            onChange={(e) => setInputUuid(e.target.value)}
                        />
                        <TextInput
                            readOnly
                            label={"Is valid UUID"}
                            radius={"md"}
                            value={inputUuid ? uuid.validate(inputUuid) ? "Yes" : "No" : "No UUID Inputted"}
                        />
                        <TextInput
                            readOnly
                            label={"Raw Contents"}
                            radius={"md"}
                            value={inputUuid ?
                                uuid.validate(inputUuid) ?
                                    getHexStrings(inputUuid) :
                                    "UUID Invalid" :
                                "No UUID Inputted"
                            }
                        />
                        <TextInput
                            readOnly
                            label={"UUID Version"}
                            radius={"md"}
                            value={inputUuid ?
                                uuid.validate(inputUuid) ?
                                    uuid.version(inputUuid) :
                                    "UUID Invalid" :
                                "No UUID Inputted"
                            }
                        />
                    </Stack>
                </Paper>
                <Paper shadow="xs" p="md" withBorder>
                    <Stack spacing={"md"}>
                        <Grid columns={2} gutter={"md"}>
                            <Grid.Col span={1}>
                                <Select
                                    label={"UUID Type"}
                                    defaultValue={"v4"}
                                    data={[
                                        {
                                            value: "v0",
                                            label: "UUID v0"
                                        },
                                        {
                                            value: "v1",
                                            label: "UUID v1"
                                        },
                                        {
                                            value: "v4",
                                            label: "UUID v4"
                                        }
                                    ]}
                                    onChange={(e) => setGenerateUuidType(e as uuid)}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <NumberInput
                                    value={amountToGenerate}
                                    label={"Amount"}
                                    stepHoldDelay={500}
                                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                                    min={0}
                                    max={500}
                                    onChange={(e) => setAmountToGenerate(e as number)}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={clipboard.copied ? <Check/> : <Copy/>}
                                    fullWidth
                                    onClick={() => clipboard.copy(uuidList)}
                                    children={clipboard.copied ? 'Copied' : 'Copy Result'}
                                    color={clipboard.copied ? 'teal' : 'blue'}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={<Download/>}
                                    fullWidth
                                    onClick={() => {
                                        if (uuidList.split("\n").length > 0) {
                                            const blob = new Blob([uuidList], {type: "text/plain;charset=utf-8"});
                                            const url = URL.createObjectURL(blob);
                                            const link = document.createElement("a");
                                            link.href = url;
                                            link.download = `uuids.txt`;
                                            document.body.appendChild(link);
                                            return link.click();
                                        } else {
                                            return notifications.showNotification({
                                                title: "Error",
                                                message: "No UUIDs to download",
                                                color: "red",
                                                autoClose: 5000
                                            })
                                        }
                                    }}
                                    children={'Download'}
                                />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Button
                                    onClick={ () => setUuidList(generateUuids(generateUuidType, amountToGenerate)) }
                                    children={"Generate"}
                                    fullWidth
                                />
                            </Grid.Col>
                        </Grid>
                        <Textarea
                            autosize
                            minRows={10}
                            radius={"md"}
                            readOnly
                            value={uuidList}
                        />
                    </Stack>
                </Paper>
            </SimpleGrid>
        </Container>
    )
}
