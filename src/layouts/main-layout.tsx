import { Box } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box className={`${inter.className}`} p={"lg"} maw={"1200px"} m={"auto"}>
      {children}
    </Box>
  );
}
