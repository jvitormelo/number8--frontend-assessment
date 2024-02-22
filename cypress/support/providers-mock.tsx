import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MainLayout } from "@/layouts/main-layout";

export const ProvidersMock = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider>
      <MainLayout>{children}</MainLayout>
    </MantineProvider>
  );
};
