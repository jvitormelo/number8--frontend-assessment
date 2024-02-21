import { RealEstate } from "@/modules/real-state/types";
import { formatCurrency } from "@/utils/currency";
import { Badge, Box, Button, Card, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

type Props = {
  realState: RealEstate;
};

export const RealStateCard = ({ realState }: Props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Box pos={"relative"} h={"150px"}>
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          src={realState.thumbnailURL}
          fill
          alt={realState.title}
        />
      </Box>

      <Stack my={"md"} gap={"xs"}>
        <Text fw={500}>{realState.title}</Text>
        <Badge color="gray">Location</Badge>
        <Text size="sm" c="dimmed">
          {realState.bedrooms} Bedrooms | {realState.bathrooms} Bathrooms
        </Text>
      </Stack>

      <Box mt="auto">
        <Text size="lg" fw={"bold"} mb={"md"} c="dark">
          {formatCurrency(realState.salePrice)}
        </Text>

        <Link href={`/${realState.slug}`}>
          <Button color="blue" fullWidth radius="md">
            View Details
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
