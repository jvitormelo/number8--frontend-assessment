import { RealStateCard } from "@/modules/real-state/components/card";
import { RealState } from "@/modules/real-state/types";
import { SimpleGrid } from "@mantine/core";

type Props = {
  realState: RealState[];
};

export const RealStateList: React.FC<Props> = ({ realState }) => {
  return (
    <SimpleGrid
      cols={{
        lg: 4,
        md: 2,
        sm: 1,
        xs: 1,
      }}
    >
      {realState.map((realState) => (
        <RealStateCard realState={realState} key={realState.id} />
      ))}
    </SimpleGrid>
  );
};
