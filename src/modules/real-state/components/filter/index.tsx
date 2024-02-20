import { RealStateFilters } from "@/modules/real-state/types";
import {
  Box,
  Button,
  Flex,
  Group,
  RangeSlider,
  Select,
  Slider,
  Text,
} from "@mantine/core";
import Link from "next/link";

type Props = {
  filter: RealStateFilters;
  setFilter: (filter: Partial<RealStateFilters>) => void;
};

export const RealStateFilterSection = ({ filter, setFilter }: Props) => {
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

      {/* Because I'm doing SSR for the search, i can just push a new page and the SSR will handle for me */}
      <Link href={{ query: filter }}>
        <Button>Search</Button>
      </Link>
    </Group>
  );
};
