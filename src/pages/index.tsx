import { getRealEstate } from "@/modules/real-state/api/get-real-state";
import { RealStateFilterSection } from "@/modules/real-state/components/filter";
import { RealStateList } from "@/modules/real-state/components/list";
import { RealEstate, RealEstateFilter } from "@/modules/real-state/types";
import { filterRealState } from "@/modules/real-state/utils/filter-real-state";
import { parseRealStateQuery } from "@/modules/real-state/utils/parse-query";
import { Stack } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  realState: RealEstate[];
  initialFilters: RealEstateFilter;
};

// I could have used client side filtering, but because is a with Next.js, I decided to use SSR
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const realState = await getRealEstate();

  const filters = parseRealStateQuery(context.query);

  await new Promise((resolve) => setTimeout(resolve, 200));

  // Only work in production
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );

  return {
    props: {
      realState: filterRealState(realState, filters),
      initialFilters: filters,
    },
  };
};

export default function Home({ realState, initialFilters }: Props) {
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
