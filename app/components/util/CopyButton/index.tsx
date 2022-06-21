import { ActionIcon, Tooltip } from "@mantine/core";
import { useClipboard, useHover } from '@mantine/hooks';
import { Clipboard, Check } from "tabler-icons-react"
import React from "react"

export default function CopyButton({payload, toolTipLocation}: {payload: string, toolTipLocation: "top" | "right" | "bottom" | "left"}) {
    const clipboard = useClipboard({ timeout: 1000 });
    const { hovered, ref } = useHover();

    return (
        <Tooltip
            label={clipboard.copied ? "Copied!" : "Copy"}
            position={toolTipLocation}
            ref={ref}
            opened={hovered}
        >
            <ActionIcon
                onClick={() => {
                    clipboard.copy(payload)
                }
            }
            >
                {
                    clipboard.copied ?
                        <Check/> :
                        <Clipboard/>
                }
            </ActionIcon>
        </Tooltip>
    )
}
