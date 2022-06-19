import React, {useState} from "react";
import {Container, Grid, NumberInput, Space, Text, Textarea} from "@mantine/core";
import {Prism} from "@mantine/prism";
import { unparse } from "papaparse";

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

export default function JsonCsv() {
    const [text, setText] = useState(example);

    return (
        <>
            <Grid columns={2}>
                <Grid.Col span={1}>
                    <Space w={"md"}/>
                    <Text>
                        JSON
                    </Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Space w={"md"}/>
                    <Text>
                        CSV
                    </Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Container fluid>
                        <Textarea
                            value={text}
                            autosize
                            minRows={10}
                            onChange={(value) => setText(value.target.value.trim())}
                        />
                    </Container>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Container fluid>
                        <Textarea
                            value={ unparse(JSON.parse(text),{delimiter: ";"}) }
                            autosize
                            minRows={10}
                        />
                    </Container>
                </Grid.Col>
            </Grid>
        </>
    )
}
