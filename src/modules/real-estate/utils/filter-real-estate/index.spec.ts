import { test, beforeEach, expect, describe } from "vitest";
import { filterRealEstate } from ".";
import { RealEstate, RealEstateFilter } from "../../types";

let realEstates: Partial<RealEstate>[];
let filters: RealEstateFilter;

beforeEach(() => {
  realEstates = [
    { bathrooms: 2, bedrooms: 3, parking: 1, salePrice: 100000 },
    { bathrooms: 1, bedrooms: 2, parking: 0, salePrice: 80000 },
    { bathrooms: 3, bedrooms: 4, parking: 2, salePrice: 150000 },
  ];
});

describe("filterRealEstate", () => {
  test("should filter by bathrooms", () => {
    filters = { bathrooms: "2" };
    const result = filterRealEstate(realEstates as RealEstate[], filters);
    expect(result).toEqual([realEstates[0]]);
  });

  test("should filter by bedrooms", () => {
    filters = { bedrooms: "3" };
    const result = filterRealEstate(realEstates as RealEstate[], filters);
    expect(result).toEqual([realEstates[0]]);
  });

  test("should filter by parking", () => {
    filters = { parking: "1" };
    const result = filterRealEstate(realEstates as RealEstate[], filters);
    expect(result).toEqual([realEstates[0]]);
  });

  test("should filter by maxPrice", () => {
    filters = { maxPrice: "90000" };
    const result = filterRealEstate(realEstates as RealEstate[], filters);
    expect(result).toEqual([realEstates[1]]);
  });

  test("should filter by all conditions", () => {
    filters = {
      bathrooms: "2",
      bedrooms: "3",
      parking: "1",
      maxPrice: "100000",
    };
    const result = filterRealEstate(realEstates as RealEstate[], filters);
    expect(result).toEqual([realEstates[0]]);
  });

  test("should return all real estates when no filters are applied", () => {
    filters = {};
    const result = filterRealEstate(realEstates as RealEstate[], filters);
    expect(result).toEqual(realEstates);
  });
});
