import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MainLayout } from "@/layouts/main-layout";
import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Notifications } from "@mantine/notifications";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Real Estate App</title>
        <meta name="description" content="Real Estate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider theme={theme}>
        <MainLayout>
          <Notifications position="top-center" />
          <Component {...pageProps} />
        </MainLayout>
      </MantineProvider>
    </>
  );
}
