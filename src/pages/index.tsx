import { getRealState } from "@/modules/real-state/api/get-real-state";
import { RealStateFilterSection } from "@/modules/real-state/components/filter";
import { RealStateList } from "@/modules/real-state/components/list";
import { useRealStateFilter } from "@/modules/real-state/hooks/useRealStateFilter";
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
  const { filter, setFilter } = useRealStateFilter();
  return (
    <main className={`flex min-h-screen p-24 ${inter.className}`}>
      <RealStateFilterSection filter={filter} setFilter={setFilter} />
      <RealStateList realState={realState} />
    </main>
  );
}
