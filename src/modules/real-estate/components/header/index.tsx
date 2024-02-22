import { RealEstate } from "@/modules/real-estate/types";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import { Box, Flex, Grid, GridCol, Stack, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";

const SavePropertyButton = dynamic(
  () => import("./save-property").then((mod) => mod.SaveProperty),
  { ssr: false }
);

type Props = {
  realEstate: RealEstate;
};

export function RealEstateHeader({ realEstate }: Props) {
  const date = formatDate(realEstate.dateListed);
  return (
    <Grid component={"header"}>
      <GridCol span={{ lg: 8, xs: 12 }}>
        <Flex justify={"space-between"}>
          <Stack gap={0}>
            <Title order={2} fw={500} style={{ textWrap: "balance" }}>
              {realEstate.title}
            </Title>

            <Flex align={"center"} justify={"space-between"}>
              <Text size="lg">{realEstate.location}</Text>

              <Text hiddenFrom="md" c={"gray"}>
                {date}
              </Text>
            </Flex>
          </Stack>
          <Stack gap={0} align="flex-end">
            <Box visibleFrom="md">
              <Price salePrice={realEstate.salePrice} />
            </Box>

            <Text visibleFrom="md" c={"gray"}>
              {date}
            </Text>
          </Stack>
        </Flex>
      </GridCol>
      <GridCol span={{ lg: 4, xs: 12 }} display={"flex"}>
        <Flex ml={"auto"} mt={"xs"}>
          <SavePropertyButton realEstate={realEstate} />
        </Flex>
      </GridCol>
    </Grid>
  );
}

RealEstateHeader.Price = Price;

function Price({ salePrice }: { salePrice: number }) {
  return (
    <Title order={2} fw={500}>
      {formatCurrency(salePrice)}
    </Title>
  );
}
