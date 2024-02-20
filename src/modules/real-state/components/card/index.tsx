import { RealState } from "@/modules/real-state/types";
import { formatDollar } from "@/utils/currency";
import { Badge, Box, Button, Card, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";

type Props = {
  realState: RealState;
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
          {formatDollar(realState.salePrice)}
        </Text>

        <Button color="blue" fullWidth radius="md">
          View Details
        </Button>
      </Box>
    </Card>
  );
};
