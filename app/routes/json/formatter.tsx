import { Grid, Textarea, Container, Text, NumberInput, Space } from "@mantine/core";
import { Prism } from '@mantine/prism';
import React, { useState } from "react";

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export default function JsonFormatter() {
    const [text, setText] = useState(JSON.stringify({foo: "bar"}));
    const [numSpaces, setNumSpaces] = useState(2);

    return (
        <>
            <Grid columns={2}>
                <Grid.Col span={1}>
                    <Container fluid>
                        <Text>
                            Unformatted
                        </Text>
                        <Textarea
                            value={text}
                            autosize
                            minRows={10}
                            onChange={(value) => setText(value.target.value)}
                        />
                    </Container>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Container fluid>
                        <Grid columns={2} justify={"center"} align={"center"}>
                            <Grid.Col span={1}>
                                <Text>
                                    Formatted
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <NumberInput
                                    defaultValue={2}
                                    min={0}
                                    max={10}
                                    label="Number of JSON Spaces"
                                    onChange={(value: number | undefined) => setNumSpaces(value as number)}
                                />
                            </Grid.Col>
                        </Grid>
                        <Space h={10} />
                        <Prism
                            language={"json"}
                            withLineNumbers
                            children={isJson(text) ? `${JSON.stringify(JSON.parse(text.trim()), null, numSpaces)}` : "{}" }
                            style={{height: "100%", overflow: "auto"}}
                        />
                    </Container>
                </Grid.Col>
            </Grid>
        </>
    );
}
