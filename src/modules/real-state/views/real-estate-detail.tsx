import { BackButton } from "@/components/back-button";
import { ContactAgentForm } from "@/modules/real-state/components/contact-agent-form";
import { RealEstateHeader } from "@/modules/real-state/components/header";
import { RealEstate } from "@/modules/real-state/types";
import { Box, Card, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import ImageNext from "next/image";

type Props = {
  realEstate: RealEstate;
};

export const RealEstateDetailView = ({ realEstate }: Props) => {
  return (
    <>
      <BackButton mb={"xs"} />
      <RealEstateHeader realEstate={realEstate} />
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
