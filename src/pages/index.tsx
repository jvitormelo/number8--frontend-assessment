import { getRealState } from "@/modules/real-state/api/get-real-state";
import { RealStateFilterSection } from "@/modules/real-state/components/filter";
import { RealStateList } from "@/modules/real-state/components/list";
import { useRealStateFilters } from "@/modules/real-state/hooks/use-real-state-filters";
import { RealState } from "@/modules/real-state/types";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <main className={`flex min-h-screen p-24 ${inter.className}`}>
      <Filters />
      <RealStateList realState={realState} />
    </main>
  );
}

function Filters() {
  const { filter, setFilter } = useRealStateFilters();

  return <RealStateFilterSection filter={filter} setFilter={setFilter} />;
}
