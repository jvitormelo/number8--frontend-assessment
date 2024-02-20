import { RealState, RealStateFilters } from "@/modules/real-state/types";

function equalFilter(
  value: string | number,
  filter: string | number | undefined | null
) {
  return filter ? Number(value) === Number(filter) : true;
}

type Condition = (realState: RealState) => boolean;

export function filterRealState(
  realState: RealState[],
  filters: RealStateFilters
) {
  const conditions: Array<Condition> = [
    (realState) => equalFilter(realState.bathrooms, filters.bathrooms),
    (realState) => equalFilter(realState.bedrooms, filters.bedrooms),
    (realState) => equalFilter(realState.parking, filters.parking),

    (realState) =>
      filters.minPrice ? realState.salePrice >= Number(filters.minPrice) : true,
  ];

  return realState.filter((realState) =>
    conditions.every((condition) => condition(realState))
  );
}
