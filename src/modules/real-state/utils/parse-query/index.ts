import { RealStateFilters } from "@/modules/real-state/types";
import { ParsedUrlQuery } from "querystring";

function getStringValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value || null;
}

export function parseRealStateQuery(query: ParsedUrlQuery): RealStateFilters {
  return {
    bedrooms: getStringValue(query.bedrooms),
    bathrooms: getStringValue(query.bathrooms),
    parking: getStringValue(query.parking),
    minPrice: getStringValue(query.minPrice),
  };
}
