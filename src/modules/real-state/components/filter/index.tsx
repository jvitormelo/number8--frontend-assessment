import { useRealStateFilterOptions } from "@/modules/real-state/components/filter/use-options";
import { RealEstateFilter } from "@/modules/real-state/types";
import { formatCurrency } from "@/utils/currency";
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

  const {
    bathroomsOptions,
    bedroomsOptions,
    parkingOptions,
    maxPrice,
    minPrice,
  } = useRealStateFilterOptions();

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
        data={bedroomsOptions}
      />
      <Select
        value={filter.bathrooms}
        onChange={(value) => {
          setFilter({ bathrooms: value });
        }}
        label="Bathrooms"
        placeholder="All"
        data={bathroomsOptions}
      />

      <Select
        value={filter.parking}
        onChange={(value) => {
          setFilter({ parking: value });
        }}
        label="Parking"
        placeholder="All"
        data={parkingOptions}
      />
      <PriceRangeSlider
        max={maxPrice}
        min={minPrice}
        value={filter.maxPrice ? Number(filter.maxPrice) : maxPrice}
        onChange={(value) => {
          setFilter({ maxPrice: value });
        }}
      />

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

function PriceRangeSlider({
  onChange,
  value,
  min,
  max,
}: {
  value: number;
  onChange: (value: string) => void;
  min: number;
  max: number;
}) {
  const [realTimeValue, setRealTimeValue] = useState(value);
  return (
    <Box w={200}>
      <Text>Max Price: {formatCurrency(realTimeValue)}</Text>
      <Slider
        value={realTimeValue}
        onChange={(value) => {
          setRealTimeValue(value);
        }}
        onChangeEnd={(value) => {
          onChange(value.toString());
        }}
        min={min}
        max={max}
      />
    </Box>
  );
}
