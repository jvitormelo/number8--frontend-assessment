import "@/styles/globals.css";
import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { Box, MantineProvider } from "@mantine/core";
import { theme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Box p={"lg"} maw={"1200px"} m={"auto"}>
        <Component {...pageProps} />
      </Box>
    </MantineProvider>
  );
}
