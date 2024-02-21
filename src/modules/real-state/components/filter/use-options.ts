import { allRealEstateData } from "@/modules/real-state/api/get-real-state";

function fillNumberOptions(data: number[]) {
  // get the min and max values

  const min = Math.min(...data);
  const max = Math.max(...data);

  // create a new array with the range of values
  const range = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  // create the options
  return range.map(String);
}

const bedroomsOptions = fillNumberOptions(
  allRealEstateData.map((realEstate) => realEstate.bedrooms)
);
const bathroomsOptions = fillNumberOptions(
  allRealEstateData.map((realEstate) => realEstate.bathrooms)
);
const parkingOptions = fillNumberOptions(
  allRealEstateData.map((realEstate) => realEstate.parking)
);

const maxPrice = Math.max(
  ...allRealEstateData.map((realEstate) => realEstate.salePrice)
);

const minPrice = Math.min(
  ...allRealEstateData.map((realEstate) => realEstate.salePrice)
);

export function useRealStateFilterOptions() {
  return {
    bedroomsOptions,
    bathroomsOptions,
    parkingOptions,
    maxPrice: maxPrice,
    minPrice: minPrice,
  };
}
