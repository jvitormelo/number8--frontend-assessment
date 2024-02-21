import { RealEstate } from "@/modules/real-estate/types";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import { Flex, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SavePropertyButton = dynamic(
  () => import("./save-property-button").then((mod) => mod.SaveProperty),
  { ssr: false }
);

type Props = {
  realEstate: RealEstate;
};

export function RealEstateHeader({ realEstate }: Props) {
  return (
    <Grid component={"header"}>
      <GridCol span={{ lg: 8, xs: 12 }}>
        <Group justify={"space-between"}>
          <Stack gap={0}>
            <Title order={2} fw={500}>
              {realEstate.title}
            </Title>
            <Text size="lg">{realEstate.location}</Text>
          </Stack>
          <Stack gap={0} align="flex-end">
            <Title order={2} fw={500}>
              {formatCurrency(realEstate.salePrice)}
            </Title>
            <Text c={"gray"}>{formatDate(realEstate.dateListed)}</Text>
          </Stack>
        </Group>
      </GridCol>
      <GridCol span={{ lg: 4, xs: 12 }} display={"flex"}>
        <Flex ml={"auto"} mt={"xs"}>
          <Suspense fallback={<div>Loading...</div>}>
            <SavePropertyButton realEstate={realEstate} />
          </Suspense>
        </Flex>
      </GridCol>
    </Grid>
  );
}
