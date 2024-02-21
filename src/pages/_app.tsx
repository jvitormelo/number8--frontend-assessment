import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { MainLayout } from "@/layouts/main-layout";
import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";

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
          <Component {...pageProps} />
        </MainLayout>
      </MantineProvider>
    </>
  );
}
