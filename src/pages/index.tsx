import { allRealEstateData } from "@/modules/real-estate/data";
import { filterRealEstate } from "@/modules/real-estate/utils/filter-real-estate";

import { parseRealEstateQuery } from "@/modules/real-estate/utils/parse-query";
import { RealEstatesView } from "@/modules/real-estate/views/real-estates";
import { GetServerSideProps } from "next";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof RealEstatesView>;

// I could have used client side filtering, but because is a with Next.js, I decided to use SSR
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const filters = parseRealEstateQuery(context.query);

  await new Promise((resolve) => setTimeout(resolve, 200));

  // Only work in production
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );

  return {
    props: {
      realState: filterRealEstate(allRealEstateData, filters),
      initialFilters: filters,
    },
  };
};

export default RealEstatesView;
