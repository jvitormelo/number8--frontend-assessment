import { RealEstateFilter } from "@/modules/real-estate/types";
import { ParsedUrlQuery } from "querystring";

function getStringValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value || null;
}

export function parseRealEstateQuery(query: ParsedUrlQuery): RealEstateFilter {
  return {
    bedrooms: getStringValue(query.bedrooms),
    bathrooms: getStringValue(query.bathrooms),
    parking: getStringValue(query.parking),
    maxPrice: getStringValue(query.maxPrice),
  };
}
