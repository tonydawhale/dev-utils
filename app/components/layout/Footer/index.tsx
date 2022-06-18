import { Footer, Text } from "@mantine/core"

export default function ShellFooter () {
    return (
        <Footer height={60} p={"md"} style={{position: "fixed"}}>
            <Text style={{position: "relative", textAlign: "center"}}>
                Made with ❤️ by <a href={"https://github.com/tonydawhale"} target="_blank" rel="noopener noreferrer">tdw</a> using <a href={"https://remix.run/"} target="_blank" rel="noreferrer">Remix</a> & <a href={"https://mantine.dev/"} target="_blank" rel="noreferrer">Mantine</a> hosted on <a href={"https://pages.cloudflare.com/"} target="_blank" rel="noreferrer">Cloudflare Pages</a>
            </Text>
        </Footer>
    )
}
