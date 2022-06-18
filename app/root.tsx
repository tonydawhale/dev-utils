import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import React from "react";

import AppShell from "~/components/layout/Layout";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "u.tonydoes.dev",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
      <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
      <AppShell>
        <Outlet />
      </AppShell>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
      </body>
      </html>
  );
}
