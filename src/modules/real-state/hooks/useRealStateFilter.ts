import { RealStateFilters } from "@/modules/real-state/types";
import { useRouter } from "next/router";

const defaultFilters: RealStateFilters = {
  bathrooms: 1,
  bedrooms: 1,

  minPrice: undefined,
  parking: undefined,
};

export const useRealStateFilter = () => {
  const { query, push } = useRouter();

  const filter: RealStateFilters = {
    bathrooms: query.bathrooms
      ? parseInt(query.bathrooms as string)
      : defaultFilters.bathrooms,
    bedrooms: query.bedrooms
      ? parseInt(query.bedrooms as string)
      : defaultFilters.bedrooms,
    minPrice: query.minPrice ? parseInt(query.minPrice as string) : undefined,
    parking: query.parking ? parseInt(query.parking as string) : undefined,
  };

  const setFilter = (newFilter: Partial<RealStateFilters>) => {
    const newQuery = {
      ...query,
      ...newFilter,
    };

    push({ query: newQuery });
  };

  return { filter, setFilter };
};
