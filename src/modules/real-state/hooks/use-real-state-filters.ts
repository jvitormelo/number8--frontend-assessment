import { defaultRealStateFilters } from "@/modules/real-state/constants";
import { RealStateFilters } from "@/modules/real-state/types";
import { useRouter } from "next/router";
import { useMemo } from "react";

function formatDefaultQueryValue(
  query: string | string[] | undefined,
  defaultValue: string | undefined
) {
  let newValue = Array.isArray(query) ? query[0] : query;

  if (!newValue) {
    return defaultValue;
  }

  if (newValue === "all") {
    return newValue;
  }

  const parsedValue = Number(newValue);

  if (isNaN(parsedValue)) {
    return defaultValue;
  }

  return newValue;
}

export const useRealStateFilters = () => {
  const { query } = useRouter();

  const filter: RealStateFilters = useMemo(
    () => ({
      bathrooms: formatDefaultQueryValue(
        query.bathrooms,
        defaultRealStateFilters.bathrooms
      )!,
      bedrooms: formatDefaultQueryValue(
        query.bedrooms,
        defaultRealStateFilters.bedrooms
      )!,
      minPrice: formatDefaultQueryValue(
        query.minPrice,
        defaultRealStateFilters.minPrice
      ),
      parking: formatDefaultQueryValue(
        query.parking,
        defaultRealStateFilters.parking
      ),
    }),
    [query]
  );

  return { filters: filter };
};
