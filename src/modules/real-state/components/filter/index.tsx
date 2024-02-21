import { RealEstateFilter } from "@/modules/real-state/types";
import { Box, Button, Group, Select, Slider, Text } from "@mantine/core";
import { useState } from "react";

type Props = {
  filter: RealEstateFilter;
  setFilter: (filter: Partial<RealEstateFilter>) => void;
  search: (filter: RealEstateFilter) => Promise<void>;
  clear: () => Promise<void>;
};

export const RealStateFilterSection = ({
  filter,
  setFilter,
  search,
  clear,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch() {
    setIsLoading(true);
    search(filter).finally(() => {
      setIsLoading(false);
    });
  }
  function handleClear() {
    setIsLoading(true);
    clear().finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <Group align={"flex-end"}>
      <Select
        value={filter.bedrooms}
        onChange={(value) => {
          setFilter({ bedrooms: value });
        }}
        label="Bedrooms"
        placeholder="All"
        data={["1", "2", "3", "4"]}
      />
      <Select
        value={filter.bathrooms}
        onChange={(value) => {
          setFilter({ bathrooms: value });
        }}
        label="Bathrooms"
        placeholder="All"
        data={["1", "2", "3", "4"]}
      />

      <Select
        value={filter.parking}
        onChange={(value) => {
          setFilter({ parking: value });
        }}
        label="Parking"
        placeholder="All"
        data={["1", "2", "3", "4"]}
      />

      <Box w={200}>
        <Text>Min Price: {filter.minPrice}</Text>
        <Slider
          value={Number(filter.minPrice)}
          onChangeEnd={(value) => {
            setFilter({ minPrice: value.toString() });
          }}
          min={200_000}
          max={600_000}
        />
      </Box>

      <Group gap={"xs"}>
        <Button loading={isLoading} onClick={handleSearch}>
          Search
        </Button>
        <Button variant="subtle" onClick={handleClear}>
          Clear
        </Button>
      </Group>
    </Group>
  );
};
