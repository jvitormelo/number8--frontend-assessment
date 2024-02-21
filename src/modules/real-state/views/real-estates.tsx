import { RealStateFilterSection } from "@/modules/real-state/components/filter";
import { RealStateList } from "@/modules/real-state/components/list";
import { RealEstate, RealEstateFilter } from "@/modules/real-state/types";
import Home from "@/pages";
import { Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { ComponentProps, useState } from "react";

type Props = {
  realState: RealEstate[];
  initialFilters: RealEstateFilter;
};

export function RealEstatesView({ initialFilters, realState }: Props) {
  return (
    <Stack component={"main"}>
      <Filters
        key={JSON.stringify(initialFilters)}
        initialFilters={initialFilters}
      />
      <RealStateList realState={realState} />
    </Stack>
  );
}

function Filters({ initialFilters }: { initialFilters: RealEstateFilter }) {
  const { push } = useRouter();
  const [filter, setFilter] = useState<RealEstateFilter>(initialFilters);

  async function search(filter: RealEstateFilter) {
    await push({ query: filter });
  }

  async function clear() {
    await push({ query: {} });
  }

  return (
    <RealStateFilterSection
      filter={filter}
      setFilter={(newValue) => setFilter((old) => ({ ...old, ...newValue }))}
      search={search}
      clear={clear}
    />
  );
}
