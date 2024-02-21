import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { MainLayout } from "@/layouts/main-layout";
import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </MantineProvider>
  );
}
