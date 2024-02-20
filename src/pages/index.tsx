import { getRealState } from "@/modules/real-state/api/get-real-state";
import { RealStateFilterSection } from "@/modules/real-state/components/filter";
import { RealStateList } from "@/modules/real-state/components/list";
import { defaultRealStateFilters } from "@/modules/real-state/constants";
import { RealState, RealStateFilters } from "@/modules/real-state/types";
import { Stack } from "@mantine/core";
import { GetStaticProps } from "next";
import { useReducer } from "react";

type Props = {
  realState: RealState[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const realState = await getRealState();

  return {
    props: {
      realState,
    },
  };
};

export default function Home({ realState }: Props) {
  return (
    <Stack component={"main"}>
      <Filters />
      <RealStateList realState={realState} />
    </Stack>
  );
}

function Filters() {
  const [filter, setFilter] = useReducer(
    (state: RealStateFilters, newState: Partial<RealStateFilters>) => {
      return { ...state, ...newState };
    },
    defaultRealStateFilters
  );

  return <RealStateFilterSection filter={filter} setFilter={setFilter} />;
}
