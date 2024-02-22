import { BackButton } from "@/components/back-button";
import { ContactAgentForm } from "@/modules/real-estate/components/contact-agent-form";
import { RealEstateHeader } from "@/modules/real-estate/components/header";
import { RealEstate } from "@/modules/real-estate/types";
import { Card, Flex, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import Head from "next/head";
import ImageNext from "next/image";

type Props = {
  realEstate: RealEstate;
};

export const RealEstateDetailView = ({ realEstate }: Props) => {
  return (
    <>
      <Head>
        <title>{realEstate.title}</title>
      </Head>
      <BackButton mb={"xs"} />
      <RealEstateHeader realEstate={realEstate} />
      <Grid gutter={"lg"}>
        <GridCol span={{ xs: 12, md: 8 }}>
          <Stack>
            <Card
              radius={"md"}
              bg={"gray.3"}
              pos={"relative"}
              style={{
                aspectRatio: "1/1",
                maxHeight: "400px",
              }}
            >
              <ImageNext
                src={realEstate.pictureURL}
                alt={realEstate.title}
                quality={100}
                fill
                sizes="(max-width: 768px) 100vw,  70vw"
              />
            </Card>
            <Card withBorder title="Sale Price" hiddenFrom="md">
              <Text>Sale Price</Text>
              <Flex>
                <RealEstateHeader.Price salePrice={realEstate.salePrice} />
              </Flex>
            </Card>
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
