import React, { useState } from "react";
import CopyButton from "~/components/util/CopyButton";
import {Group, Select, TextInput, Grid, ActionIcon, Tooltip, Container, Paper} from "@mantine/core";
import { RotateClockwise } from "tabler-icons-react";

const units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}

const getRelativeTime = (d1: number, d2: number) => {
    const rtf = new Intl.RelativeTimeFormat( 'en', { numeric: 'auto' } )
    const elapsed = d1 - d2

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (const u in units)
        { // @ts-ignore
            if (Math.abs(elapsed) > units[u] || u == 'second')
                        { // @ts-ignore
                            return rtf.format(Math.round(elapsed/units[u]), u)
                        }
        }
}

export default function Unix() {
    const [time, setTime] = useState(Date.now())
    const [typeOfTime, setTypeOfTime] = useState<"seconds" | "milliseconds">("milliseconds")

    const components = [
        <TextInput
            label={"Input"}
            value={time}
            onChange={(value) => setTime(parseInt(value.target.value))}
            rightSection={
                <>
                    <Tooltip
                        label={"Refresh"}
                    >
                        <ActionIcon
                            onClick={() =>
                                typeOfTime === "milliseconds" ?
                                    setTime(Date.now()) :
                                    setTime(Math.floor(Date.now()/1000))
                            }
                        >
                            <RotateClockwise/>
                        </ActionIcon>
                    </Tooltip>
                </>
            }
        />,
        <Select
            label={"Data Type"}
            data={["seconds", "milliseconds"].map(type => type.charAt(0).toUpperCase() + type.slice(1))}
            value={`${typeOfTime.charAt(0).toUpperCase() + typeOfTime.slice(1)}`}
            onChange={(value) => {
                setTypeOfTime(value?.toLowerCase() as "seconds" | "milliseconds")
                typeOfTime === "milliseconds" ?
                    setTime(Math.floor(new Date().getTime()/1000.0)) :
                    setTime(Math.floor(new Date().getTime()))
            }
            }
        />,
        <TextInput
            label={`Your Timestamp`}
            readOnly={true}
            value={new Date( typeOfTime === "seconds" ? time * 1000 : time).toLocaleString()}
            rightSection={
                <CopyButton
                    payload={new Date( typeOfTime === "seconds" ? time * 1000 : time).toLocaleString()}
                    toolTipLocation={"right"}
                />
            }
        />,
        <TextInput
            label={"Relative"}
            readOnly={true}
            value={getRelativeTime(typeOfTime === "seconds" ? time * 1000 : time, Date.now())}
            rightSection={
                <CopyButton
                    payload={getRelativeTime(typeOfTime === "seconds" ? time * 1000 : time, Date.now()) as string}
                    toolTipLocation={"right"}
                />
            }
        />,
        <TextInput
            label={"UTC Timestamp"}
            readOnly={true}
            value={new Date( typeOfTime === "seconds" ? time * 1000 : time).toUTCString()}
            rightSection={
                <CopyButton
                    payload={new Date( typeOfTime === "seconds" ? time * 1000 : time).toUTCString()}
                    toolTipLocation={"right"}
                />
            }
        />,
        <TextInput
            label={"ISO Timestamp"}
            readOnly={true}
            value={new Date( typeOfTime === "seconds" ? time * 1000 : time).toISOString()}
            rightSection={
                <CopyButton
                    payload={new Date( typeOfTime === "seconds" ? time * 1000 : time).toISOString()}
                    toolTipLocation={"right"}
                />
            }
        />,
        <TextInput
            label={"Your Local Date"}
            readOnly={true}
            value={new Date( typeOfTime === "seconds" ? time * 1000 : time).toLocaleDateString()}
            rightSection={
                <CopyButton
                    payload={new Date( typeOfTime === "seconds" ? time * 1000 : time).toLocaleDateString()}
                    toolTipLocation={"right"}
                />
            }
        />,
        <TextInput
            label={"Your Local Time Stamp"}
            readOnly={true}
            value={new Date( typeOfTime === "seconds" ? time * 1000 : time).toLocaleTimeString()}
            rightSection={
                <CopyButton
                    payload={new Date( typeOfTime === "seconds" ? time * 1000 : time).toLocaleTimeString()}
                    toolTipLocation={"right"}
                />
            }
        />
    ]

    return (
        <Container>
            <Paper shadow="xs" p="md" withBorder>
                <Grid columns={2} gutter={"md"} align={"flex-start"} justify={"center"}>
                        {components.map((i, index) =>
                            <Grid.Col span={1} key={index}>
                                <Group position={"center"}>
                                    {components[index]}
                                </Group>
                            </Grid.Col>
                        )}
                </Grid>
            </Paper>
        </Container>
    )
}
