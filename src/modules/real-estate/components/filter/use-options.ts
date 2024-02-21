import { allRealEstateData } from "@/modules/real-estate/data";

function createUniqueOptions(data: number[]): string[] {
  const uniqueOptions = new Set(data);

  return Array.from(uniqueOptions, String).toSorted();
}

const bedroomsOptions = createUniqueOptions(
  allRealEstateData.map((realEstate) => realEstate.bedrooms)
);

const bathroomsOptions = createUniqueOptions(
  allRealEstateData.map((realEstate) => realEstate.bathrooms)
);

const parkingOptions = createUniqueOptions(
  allRealEstateData.map((realEstate) => realEstate.parking)
);

const salePriceMap = allRealEstateData.map(
  (realEstate) => realEstate.salePrice
);

const maxPrice = Math.max(...salePriceMap);

const minPrice = Math.min(...salePriceMap);

export function useRealStateFilterOptions() {
  return {
    bedroomsOptions,
    bathroomsOptions,
    parkingOptions,
    maxPrice: maxPrice,
    minPrice: minPrice,
  };
}
