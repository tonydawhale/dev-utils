import React, { useState } from "react";
import {Button, Container, Grid, Paper, Select, SimpleGrid, Stack, Textarea} from "@mantine/core";
import {parse, unparse} from "papaparse";
import { useClipboard} from "@mantine/hooks";
import {Check, Copy, Download, InfoCircle, Trash} from "tabler-icons-react";
import {useNotifications} from "@mantine/notifications";

declare type delimiter = "," | ";" | "|" | ":" | " ";

const example = `[
  {
    "Username": "booker12",
    "Identifier": "9012",
    "First name": "Rachel",
    "Last name": "Booker"
  },
  {
    "Username": "grey07",
    "Identifier": "2070",
    "First name": "Laura",
    "Last name": "Grey"
  },
  {
    "Username": "johnson81",
    "Identifier": "4081",
    "First name": "Craig",
    "Last name": "Johnson"
  },
  {
    "Username": "jenkins46",
    "Identifier": "9346",
    "First name": "Mary",
    "Last name": "Jenkins"
  },
  {
    "Username": "smith79",
    "Identifier": "5079",
    "First name": "Jamie",
    "Last name": "Smith"
  }
]`

const convert = (data: any, delimiter: string) => {
    try {
        return unparse(JSON.parse(data),{delimiter})
    } catch {
        return "";
    }
}


export default function JsonCsv() {
    const [text, setText] = useState("");
    const [delimiter, setDelimiter] = useState<delimiter>(";");
    const clipboard = useClipboard({ timeout: 500 });

    return (
        <Container>
            <SimpleGrid cols={2} spacing={"md"} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                <Paper shadow="xs" p="md" withBorder>
                    <Stack spacing={"md"}>
                        <Grid columns={2} gutter={"md"} grow justify={"center"}>
                            <Grid.Col span={2}>
                                <Select
                                    label={"Delimiter"}
                                    value={delimiter}
                                    data={[
                                        {
                                            value: ",",
                                            label: "Use Comma as Delimiter"
                                        },
                                        {
                                            value: ";",
                                            label: "Use Semicolon as Delimiter"
                                        },
                                        {
                                            value: "|",
                                            label: "Use Pipe as Delimiter"
                                        },
                                        {
                                            value: ":",
                                            label: "Use Colon as Delimiter"
                                        },
                                        {
                                            value: " ",
                                            label: "Use Space as Delimiter"
                                        }
                                    ]}
                                    onChange={(e) => setDelimiter(e as delimiter)}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Button
                                    leftIcon={clipboard.copied ? <Check/> : <Copy/>}
                                    onClick={() => clipboard.copy(convert(text.trim(), delimiter))}
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
                                        const blob = new Blob([convert(text.trim(), delimiter)], {type: "text/plain"});
                                        const url = URL.createObjectURL(blob);
                                        const link = document.createElement("a");
                                        link.href = url;
                                        link.download = `output.csv`;
                                        document.body.appendChild(link);
                                        return link.click();
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
                                    onClick={() => setText("[]")}
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
                            placeholder={`Enter JSON to Convert`}
                        />
                    </Stack>
                </Paper>
                <Paper shadow="xs" p="md" withBorder>
                    <Textarea
                        autosize
                        minRows={14}
                        radius={"md"}
                        readOnly
                        value={convert(text.trim(), delimiter)}
                        placeholder={"CSV"}
                    />
                </Paper>
            </SimpleGrid>
        </Container>
    )
}
