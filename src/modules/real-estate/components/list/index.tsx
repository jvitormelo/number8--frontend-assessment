import { RealStateCard } from "@/modules/real-estate/components/card";
import { RealEstate } from "@/modules/real-estate/types";
import { SimpleGrid } from "@mantine/core";

type Props = {
  realState: RealEstate[];
};

export const RealStateList: React.FC<Props> = ({ realState }) => {
  return (
    <SimpleGrid cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}>
      {realState.map((realState) => (
        <RealStateCard realState={realState} key={realState.id} />
      ))}
    </SimpleGrid>
  );
};
