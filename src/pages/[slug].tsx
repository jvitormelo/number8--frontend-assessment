import { getRealEstate } from "@/modules/real-state/api/get-real-state";
import { RealEstate } from "@/modules/real-state/types";
import { formatDollar } from "@/utils/currency";
import {
  Card,
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";

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
      <GridCol span={8}>
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
      </GridCol>

      <GridCol span={4}>
        <Stack>
          <Card withBorder h={"full"}></Card>
        </Stack>
      </GridCol>
    </Grid>
  );
};

export default RealEstateDetail;
