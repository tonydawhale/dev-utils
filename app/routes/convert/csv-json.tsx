import React, {useState} from "react";
import {Prism} from "@mantine/prism";
import { parse } from "papaparse"
import {Container, Grid, NumberInput, Space, Text, Textarea} from "@mantine/core";

const example = `Username;Identifier;First name;Last name
booker12;9012;Rachel;Booker
grey07;2070;Laura;Grey
johnson81;4081;Craig;Johnson
jenkins46;9346;Mary;Jenkins
smith79;5079;Jamie;Smith`


export default function CsvJson() {
    const [text, setText] = useState(example);
    const [numSpaces, setNumSpaces] = useState(2);

    return (
        <>
            <Grid columns={2}>
                <Grid.Col span={1}>
                    <Space w={"md"}/>
                    <Text>
                        CSV
                    </Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Space w={"md"}/>
                    <Text>
                        JSON
                    </Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Container fluid>
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
                        <NumberInput
                            defaultValue={2}
                            min={0}
                            max={10}
                            label="Number of JSON Spaces"
                            onChange={(value: number | undefined) => setNumSpaces(value as number)}
                        />
                        <Space h={10} />
                        <Prism
                            language={"json"}
                            withLineNumbers
                            children={ JSON.stringify(parse(text.trim(), {header: true}).data, null, numSpaces) }
                            style={{height: "100%", overflow: "auto"}}
                        />
                    </Container>
                </Grid.Col>
            </Grid>
        </>
    )
}
