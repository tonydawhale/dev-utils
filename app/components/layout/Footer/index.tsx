import { Footer, Text } from "@mantine/core"
import useStyles from "./Footer.styles"

export default function ShellFooter () {
    const { classes } = useStyles();
    return (
        <Footer height={60} p={"md"} style={{position: "fixed"}}>
            <Text style={{position: "relative", textAlign: "center"}}>
                Made with ❤️ by <a className={classes.anchorTag} href={"https://github.com/tonydawhale"} target="_blank" rel="noopener noreferrer">tdw</a> using <a className={classes.anchorTag} href={"https://remix.run/"} target="_blank" rel="noreferrer">Remix</a> & <a className={classes.anchorTag} href={"https://mantine.dev/"} target="_blank" rel="noreferrer">Mantine</a> hosted on <a className={classes.anchorTag} href={"https://pages.cloudflare.com/"} target="_blank" rel="noreferrer">Cloudflare Pages</a>
            </Text>
        </Footer>
    )
}
