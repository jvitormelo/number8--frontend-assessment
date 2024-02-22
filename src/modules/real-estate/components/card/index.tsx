import { RealEstate } from "@/modules/real-estate/types";
import { formatCurrency } from "@/utils/currency";
import { Badge, Box, Button, Card, Group, Stack, Text } from "@mantine/core";
import { Heart } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type Props = {
  realEstate: RealEstate;
  isSaved: boolean;
};

const RealEstateCardComponent = ({ realEstate, isSaved }: Props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Box pos={"relative"} h={"150px"}>
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          src={realEstate.thumbnailURL}
          fill
          alt={realEstate.title}
        />
      </Box>

      <Stack my={"md"} gap={"xs"}>
        <Text title={realEstate.title} fw={500} truncate="end">
          {realEstate.title}
        </Text>
        <Group gap={"xs"}>
          <Badge color="gray">Location</Badge>
          {isSaved && <Heart fill="red" size={20} />}
        </Group>
        <Text size="sm" c="dimmed">
          {realEstate.bedrooms} Bedrooms | {realEstate.bathrooms} Bathrooms
        </Text>
      </Stack>

      <Box mt="auto">
        <Text size="lg" fw={"bold"} mb={"md"} c="dark">
          {formatCurrency(realEstate.salePrice)}
        </Text>

        <Link href={`/${realEstate.slug}`}>
          <Button color="blue" fullWidth radius="md">
            View Details
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export const RealEstateCard = memo(RealEstateCardComponent);
