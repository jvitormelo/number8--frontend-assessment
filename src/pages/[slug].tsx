import { BackButton } from "@/components/back-button";
import { getRealEstate } from "@/modules/real-state/api/get-real-state";
import { ContactAgentForm } from "@/modules/real-state/components/contact-agent-form";
import { RealEstate } from "@/modules/real-state/types";
import { formatDollar } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridCol,
  Group,
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
    <>
      <BackButton mb={"xs"} />
      <Header realEstate={realEstate} />
      <Grid gutter={"lg"}>
        <GridCol span={{ xs: 12, md: 8 }}>
          <Stack>
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
          <ContactAgentForm />
        </GridCol>
      </Grid>
    </>
  );
};

function Header({
  realEstate: { title, location, salePrice, dateListed },
}: Props) {
  return (
    <Grid>
      <GridCol span={{ lg: 8, xs: 12 }}>
        <Group justify={"space-between"} component={"header"}>
          <Stack gap={0}>
            <Title order={2} fw={500}>
              {title}
            </Title>
            <Text size="lg">{location}</Text>
          </Stack>
          <Stack gap={0} align="flex-end">
            <Title order={2} fw={500}>
              {formatDollar(salePrice)}
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

function SaveProperty() {
  return <Button variant="light">Save Property</Button>;
}

export default RealEstateDetail;
