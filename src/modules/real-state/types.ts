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

export type RealStateFilter = Partial<{
  bedrooms: string | null;
  bathrooms: string | null;
  parking: string | null;
  minPrice: string | null;
}>;
