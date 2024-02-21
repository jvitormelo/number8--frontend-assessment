import { RealEstate } from "@/modules/real-state/types";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import {
  Button,
  Flex,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

type Props = {
  realEstate: RealEstate;
};

export function RealEstateHeader({
  realEstate: { title, location, salePrice, dateListed },
}: Props) {
  return (
    <Grid component={"header"}>
      <GridCol span={{ lg: 8, xs: 12 }}>
        <Group justify={"space-between"}>
          <Stack gap={0}>
            <Title order={2} fw={500}>
              {title}
            </Title>
            <Text size="lg">{location}</Text>
          </Stack>
          <Stack gap={0} align="flex-end">
            <Title order={2} fw={500}>
              {formatCurrency(salePrice)}
            </Title>
            <Text c={"gray"}>{formatDate(dateListed)}</Text>
          </Stack>
        </Group>
      </GridCol>
      <GridCol span={{ lg: 4, xs: 12 }} display={"flex"}>
        <Flex ml={"auto"} mt={"xs"}>
          <SaveProperty />
        </Flex>
      </GridCol>
    </Grid>
  );
}

function SaveProperty() {
  return <Button variant="light">Save Property</Button>;
}
