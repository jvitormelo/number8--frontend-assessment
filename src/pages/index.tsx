import { getRealState } from "@/modules/real-state/api/get-real-state";
import { RealStateList } from "@/modules/real-state/components/list";
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
      <RealStateList realState={realState} />
    </main>
  );
}
