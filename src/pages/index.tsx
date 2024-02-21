import { getRealEstate } from "@/modules/real-state/api/get-real-state";
import { filterRealState } from "@/modules/real-state/utils/filter-real-state";
import { parseRealStateQuery } from "@/modules/real-state/utils/parse-query";
import { RealEstatesView } from "@/modules/real-state/views/real-estates";
import { GetServerSideProps } from "next";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof RealEstatesView>;

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

export default RealEstatesView;
