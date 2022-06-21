import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import React, {useEffect} from "react";
import type { } from '@skyra/discord-components-core';

import Layout from "~/components/layout/Layout";
import Head from "~/components/Helmet/Head";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "u.tonydoes.dev",
  viewport: "width=device-width,initial-scale=1",
    'og:title': "u.tonydoes.dev"
});

export default function App() {
    useEffect(() => {
        window.$discordMessage = {
            profiles: {
                tonydawhale: {
                    author: "tdw",
                    avatar: "./public/icon.jpg",
                    roleColor: "#429bb8",
                    bot: true,
                    verified: true
                }
            }
        }
    }, [])
  return (
    <html lang="en">
        <head>
            <Head
                title={'u.tonydoes.dev'}
                description={'tony\'s developer utilities'}
            />
            <Links />
        </head>
        <body>
            <Layout>
                <Outlet />
            </Layout>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
        </body>
    </html>
  );
}
