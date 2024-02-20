import "@/styles/globals.css";
import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { Box, MantineProvider } from "@mantine/core";
import { theme } from "@/styles/theme";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Box
          className={`${inter.className}`}
          p={"lg"}
          maw={"1200px"}
          m={"auto"}
        >
          <Component {...pageProps} />
        </Box>
      </MantineProvider>
    </QueryClientProvider>
  );
}
