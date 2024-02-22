import { RealEstateCard } from "@/modules/real-estate/components/card";
import { RealEstate } from "@/modules/real-estate/types";
import { Flex, SimpleGrid, Title } from "@mantine/core";
import { useSavedProperties } from "../../hooks/use-saved-properties";
import { useMemo } from "react";

type Props = {
  realEstates: RealEstate[];
};

export const RealEstateList: React.FC<Props> = ({ realEstates }) => {
  const { savedProperties } = useSavedProperties();

  const savedPropertiesSet = useMemo(
    () => new Set(savedProperties.map(({ id }) => id)),
    [savedProperties]
  );

  if (!realEstates.length) return <NoResults />;

  return (
    <SimpleGrid cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}>
      {realEstates.map((realState) => (
        <RealEstateCard
          isSaved={savedPropertiesSet.has(realState.id)}
          realEstate={realState}
          key={realState.id}
        />
      ))}
    </SimpleGrid>
  );
};

function NoResults() {
  return (
    <Flex justify={"center"}>
      <Title order={2} mt={"lg"}>
        No results found 😔
      </Title>
    </Flex>
  );
}
