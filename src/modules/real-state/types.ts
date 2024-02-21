export type RealEstate = {
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
  slug: string;
};

export type RealEstateFilter = Partial<{
  bedrooms: string | null;
  bathrooms: string | null;
  parking: string | null;
  maxPrice: string | null;
}>;
