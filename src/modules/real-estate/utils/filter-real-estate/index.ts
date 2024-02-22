import { RealEstate, RealEstateFilter } from "@/modules/real-estate/types";

function equalFilter(
  value: string | number,
  filter: string | number | undefined | null
) {
  return filter ? Number(value) === Number(filter) : true;
}

type Condition = (realState: RealEstate) => boolean;

export function filterRealEstate(
  realState: RealEstate[],
  filters: RealEstateFilter
) {
  const conditions: Array<Condition> = [
    (realState) => equalFilter(realState.bathrooms, filters.bathrooms),
    (realState) => equalFilter(realState.bedrooms, filters.bedrooms),
    (realState) => equalFilter(realState.parking, filters.parking),

    (realState) =>
      filters.maxPrice ? realState.salePrice <= Number(filters.maxPrice) : true,
  ];

  return realState.filter((realState) =>
    conditions.every((condition) => condition(realState))
  );
}
