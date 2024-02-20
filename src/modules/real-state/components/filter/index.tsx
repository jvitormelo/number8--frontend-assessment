import { RealStateFilters } from "@/modules/real-state/types";
import { Button, Flex, Group, Select } from "@mantine/core";

type Props = {
  filter: RealStateFilters;
  setFilter: (filter: Partial<RealStateFilters>) => void;
};

export const RealStateFilterSection = ({ filter, setFilter }: Props) => {
  return (
    <Group align={"flex-end"}>
      <Select
        value={filter.bathrooms.toString()}
        onChange={(value) => {
          console.log(value);
          setFilter({ bathrooms: value ?? "1" });
        }}
        label="Beedrooms"
        placeholder="Pick value"
        data={["1", "2", "3", "4", "all"]}
      />

      <Button>Search</Button>
    </Group>
  );
};
