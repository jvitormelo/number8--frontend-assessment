import { getRealEstate } from "@/modules/real-state/api/get-real-state";
import { RealEstate } from "@/modules/real-state/types";
import { formatDollar } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import {
  Box,
  Card,
  Grid,
  GridCol,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import ImageNext from "next/image";

type Params = {
  slug: string;
};

type Props = {
  realEstate: RealEstate;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const realEstates = await getRealEstate();
  return {
    paths: realEstates.map((realEstate) => ({
      params: { slug: realEstate.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug as string;

  const realEstates = await getRealEstate();

  const realEstate = realEstates.find((realEstate) => realEstate.slug === slug);

  return {
    notFound: !realEstate,
    props: {
      realEstate: realEstate!,
    },
  };
};

const RealEstateDetail = ({ realEstate }: Props) => {
  return (
    <Grid gutter={"lg"}>
      <GridCol span={{ xs: 12, md: 8 }}>
        <Stack>
          <Header realEstate={realEstate} />
          <Box pos={"relative"} h={"400px"}>
            <ImageNext
              src={realEstate.pictureURL}
              alt={realEstate.title}
              fill
              sizes="(max-width: 768px) 100vw,  70vw"
            />
          </Box>
          <Info realEstate={realEstate} />

          <Text>{realEstate.description}</Text>
        </Stack>
      </GridCol>

      <GridCol span={{ xs: 12, md: 4 }}>
        <Stack>
          <Card withBorder h={"full"}></Card>
        </Stack>
      </GridCol>
    </Grid>
  );
};

function Header({
  realEstate: { title, location, salePrice, dateListed },
}: Props) {
  return (
    <Group justify={"space-between"} component={"header"}>
      <Stack gap={"xs"}>
        <Title order={1} fw={500}>
          {title}
        </Title>
        <Text size="lg">{location}</Text>
      </Stack>
      <Stack gap={"xs"} align="flex-end">
        <Title order={1} fw={500}>
          {formatDollar(salePrice)}
        </Title>
        <Text c={"gray"}>{formatDate(dateListed)}</Text>
      </Stack>
    </Group>
  );
}

function Info({
  realEstate: { bathrooms, bedrooms, parking, sqft, yearBuilt },
}: Props) {
  const items = [
    { label: "Bedrooms", value: bedrooms },
    { label: "Bathrooms", value: bathrooms },
    { label: "Parking", value: parking },
    { label: "SQFT", value: sqft },
    { label: "Year Built", value: yearBuilt },
  ];

  return (
    <Card withBorder p={"lg"} component="section">
      <Group justify="space-between">
        {items.map((item) => (
          <Stack key={item.label} gap={0} align="center">
            <Text size="xl" fw={"bold"}>
              {item.value}
            </Text>
            <Text>{item.label}</Text>
          </Stack>
        ))}
      </Group>
    </Card>
  );
}

export default RealEstateDetail;
