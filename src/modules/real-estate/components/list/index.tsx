import { RealStateCard } from "@/modules/real-estate/components/card";
import { RealEstate } from "@/modules/real-estate/types";
import { Flex, SimpleGrid, Title } from "@mantine/core";

type Props = {
  realState: RealEstate[];
};

export const RealStateList: React.FC<Props> = ({ realState }) => {
  if (!realState.length) return <NoResults />;

  return (
    <SimpleGrid cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}>
      {realState.map((realState) => (
        <RealStateCard realState={realState} key={realState.id} />
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
