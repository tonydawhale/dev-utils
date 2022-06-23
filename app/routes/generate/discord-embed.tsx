import React from "react";
import {DiscordMessages, DiscordEmbed as DiscordEmbedComponent, DiscordMessage, DiscordMention, DiscordEmbedDescription} from "@skyra/discord-components-react";

export default function DiscordEmbed() {
    return (
        <DiscordMessages>
            <DiscordMessage
                profile={"tonydawhale"}
            >
                <DiscordEmbedComponent
                    color="#0F52BA"
                    slot={"embed"}
                >
                    <DiscordEmbedDescription
                        slot={"description"}
                    >
                        Hey
                    </DiscordEmbedDescription>
                </DiscordEmbedComponent>
            </DiscordMessage>
        </DiscordMessages>
    )
}
