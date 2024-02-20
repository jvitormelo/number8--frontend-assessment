export type RealState = {
  id: number;
  dateListed: string;
  title: string;
  description: string;
  salePrice: number;
  thumbnailURL: string;
  pictureURL: string;
  location: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  yearBuilt: number;
};

export type RealStateFilters = {
  bedrooms: number;
  bathrooms: number;
  parking?: number;
  minPrice?: number;
};
