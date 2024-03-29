import * as icons from "tabler-icons-react";

interface redirectSection {
    sectionTitle: string
    links: {
        title: string
        description: string
        href: string
        enabled: boolean
        icon: string
    }[]
}

export const redirects: redirectSection[] = [
    {
        sectionTitle: "Core Utilities",
        links: [
            {
                title: "URL Shortener",
                description: "Shorten your URLs and save them for later.",
                href: "/url",
                enabled: false,
                icon: "Link"
            },
            {
                title: "Image Host",
                description: "Upload your images to share them later.",
                href: "/img",
                enabled: false,
                icon: "Photo"
            }
        ]
    },
    {
        sectionTitle: "JSON Utilities",
        links: [
            {
                title: "JSON Formatter",
                description: "Format JSON strings and files.",
                href: "/json/formatter",
                enabled: true,
                icon: "Braces"
            },
            {
                title: "JSON Validator",
                description: "Validate JSON strings and files.",
                href: "/json/validator",
                enabled: false,
                icon: "Braces"
            }
        ]
    },
    {
        sectionTitle: "Converters",
        links: [
            {
                title: "Unix Time Converter",
                description: "Convert between Unix time and human readable time",
                href: "/convert/unix",
                enabled: true,
                icon: "Clock"
            },
            {
                title: "JSON to CSV",
                description: "Convert JSON to CSV",
                href: "/convert/json-csv",
                enabled: true,
                icon: "Replace"
            },
            {
                title: "CSV to JSON",
                description: "Convert CSV to JSON",
                href: "/convert/csv-json",
                enabled: true,
                icon: "Replace"
            },
            {
                title: "JSON to YAML",
                description: "Convert JSON to YAML",
                href: "/convert/json-yaml",
                enabled: false,
                icon: "Replace"
            },
            {
                title: "YAML to JSON",
                description: "Convert YAML to JSON",
                href: "/convert/yaml-json",
                enabled: false,
                icon: "Replace"
            },
            {
                title: "Base64 String Decode/Encode",
                description: "Encode and Decode strings to and from base64",
                href: "/convert/base64-string",
                enabled: true,
                icon: "Replace"
            }
        ]
    },
    {
        sectionTitle: "Generators",
        links: [
            {
                title: "Discord DiscordEmbed Generator",
                description: "Uuid Discord embeds and save their JSON",
                href: "/generate/discord-embed",
                enabled: false,
                icon: "SquarePlus"
            },
            {
                title: "UUID Generator",
                description: "Uuid UUIDs with various formats",
                href: "/generate/uuid",
                enabled: true,
                icon: "SquarePlus"
            }
        ]
    },
]
