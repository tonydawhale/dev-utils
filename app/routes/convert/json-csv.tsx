import React, {useState} from "react";
import {Button, Container, createStyles, Grid, Select, Space, Text, Textarea} from "@mantine/core";
import { unparse } from "papaparse";
import CopyButton from "~/components/util/CopyButton";

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

const convert = (data: any) => {
    try {
        return unparse(JSON.parse(data),{delimiter: ";"})
    } catch {
        return "";
    }
}


export default function JsonCsv() {
    const [text, setText] = useState(example);

    return (
        <>
            <Grid columns={2}>
                <Grid.Col span={1}>
                    <Container fluid>
                        <Textarea
                            label={"JSON"}
                            value={text}
                            autosize
                            minRows={10}
                            onChange={(value) => setText(value.target.value)}
                        />
                    </Container>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Container fluid>
                        <Select data={["1", "2"]}/>
                        <Textarea
                            label={"CSV"}
                            value={ convert(text.trim()) }
                            autosize
                            minRows={10}
                            rightSection={
                                <div
                                    style={{
                                        justifyContent: "flex-end",
                                        alignContent: "flex-start"
                                    }}
                                >
                                    <CopyButton
                                        payload={ convert(text.trim()) }
                                        toolTipLocation={"right"}
                                    />
                                </div>
                            }
                        />
                    </Container>
                </Grid.Col>
            </Grid>
        </>
    )
}
