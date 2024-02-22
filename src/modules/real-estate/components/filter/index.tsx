import { useIsMobile } from "@/hooks/use-is-mobile";
import { useRealStateFilterOptions } from "@/modules/real-estate/components/filter/use-options";
import { RealEstateFilter } from "@/modules/real-estate/types";
import { formatCurrency } from "@/utils/currency";
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Group,
  Select,
  Slider,
  Text,
} from "@mantine/core";
import { SlidersHorizontal } from "lucide-react";
import { ComponentProps, PropsWithChildren, useState } from "react";
import styles from "./styles.module.css";

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
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const {
    bathroomsOptions,
    bedroomsOptions,
    parkingOptions,
    maxPrice,
    minPrice,
  } = useRealStateFilterOptions();

  async function handleSearch() {
    setIsLoading(true);

    try {
      const filteredFilter: Record<string, string> = {};

      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          filteredFilter[key] = value.toString();
        }
      });

      await search(filteredFilter);
    } finally {
      setIsLoading(false);
      setIsDrawerOpened(false);
    }
  }

  async function handleClear() {
    try {
      setIsLoading(true);

      await clear();
    } finally {
      setIsLoading(false);
      setIsDrawerOpened(false);
    }
  }

  return (
    <>
      <ActionIcon
        size={"xl"}
        variant="gradient"
        onClick={() => setIsDrawerOpened(true)}
        hiddenFrom="md"
        className={styles.filterIcon}
      >
        <SlidersHorizontal />
      </ActionIcon>

      <DynamicDrawer
        position="right"
        opened={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        title="Filter"
      >
        <Flex className={styles.filterContainer} gap={"lg"}>
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
        </Flex>
      </DynamicDrawer>
    </>
  );
};

function DynamicDrawer({
  children,
  ...rest
}: PropsWithChildren & ComponentProps<typeof Drawer>) {
  const { isMobile } = useIsMobile();

  if (isMobile) return <Drawer {...rest}>{children}</Drawer>;

  return <Box visibleFrom="md">{children}</Box>;
}

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
