import { getRealState } from "@/modules/real-state/api/get-real-state";
import { RealStateFilterSection } from "@/modules/real-state/components/filter";
import { RealStateList } from "@/modules/real-state/components/list";
import { RealState, RealStateFilter } from "@/modules/real-state/types";
import { filterRealState } from "@/modules/real-state/utils/filter-real-state";
import { parseRealStateQuery } from "@/modules/real-state/utils/parse-query";
import { Stack } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  realState: RealState[];
  initialFilters: RealStateFilter;
};

// I could have used client side filtering, but I because I created the project with Next.js, I decided to use SSR
// Because this is only demo, I did not put a SSR loading state
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const realState = await getRealState();

  const filters = parseRealStateQuery(context.query);

  // Simulate a slow connection
  await new Promise((resolve) => setTimeout(resolve, 200));

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

function Filters({ initialFilters }: { initialFilters: RealStateFilter }) {
  const { push } = useRouter();
  const [filter, setFilter] = useState<RealStateFilter>(initialFilters);

  async function search(filter: RealStateFilter) {
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
