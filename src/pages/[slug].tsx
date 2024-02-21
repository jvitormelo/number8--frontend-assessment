import { getRealEstate } from "@/modules/real-state/api/get-real-state";
import { RealEstate } from "@/modules/real-state/types";
import { formatDollar } from "@/utils/currency";
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
    <Grid>
      <GridCol span={{ xs: 12, md: 8 }}>
        <Stack>
          <Group justify={"space-between"} component={"header"}>
            <Stack>
              <Title order={1}>{realEstate.title}</Title>
              <Text>{realEstate.location}</Text>
            </Stack>
            <Stack>
              <Title order={2}>{formatDollar(realEstate.salePrice)}</Title>
              <Text c={"gray"}>{realEstate.dateListed}</Text>
            </Stack>
          </Group>
          <Box pos={"relative"} h={"400px"}>
            <ImageNext
              src={realEstate.pictureURL}
              alt={realEstate.title}
              fill
              sizes="(max-width: 768px) 100vw,  70vw"
            />
          </Box>

          <Card withBorder p={"lg"}>
            <Group justify="space-between">
              <Stack gap={0} align="center">
                <Text size="xl" fw={"bold"}>
                  {realEstate.bedrooms}
                </Text>
                <Text>Bed</Text>
              </Stack>
              <Stack>
                <Title order={3}>{realEstate.bathrooms}</Title>
                <Text>Bath</Text>
              </Stack>
              <Stack>
                <Title order={3}>{realEstate.parking}</Title>
                <Text>Parking</Text>
              </Stack>

              <Stack>
                <Title order={3}>{realEstate.sqft}</Title>
                <Text>SQFT</Text>
              </Stack>

              <Stack>
                <Title order={3}>{realEstate.yearBuilt}</Title>
                <Text>Year Built</Text>
              </Stack>
            </Group>
          </Card>

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

export default RealEstateDetail;
