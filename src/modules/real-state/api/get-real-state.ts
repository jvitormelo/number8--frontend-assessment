import { RealState } from "@/modules/real-state/types";

type RealStateResponse = {
  Id: number;
  DateListed: string;
  Title: string;
  Description: string;
  "Sale Price": number;
  ThumbnailURL: string;
  PictureURL: string;
  Location: string;
  Sqft: number;
  Bedrooms: number;
  Bathrooms: number;
  Parking: number;
  YearBuilt: number;
};

export const getRealState = async (): Promise<RealState[]> => {
  const res = await fetch(
    "https://s3.us-west-2.amazonaws.com/cdn.number8.com/LA/listings.json"
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data: RealStateResponse[] = await res.json();

  return data.map((realState) => ({
    bathrooms: realState.Bathrooms,
    bedrooms: realState.Bedrooms,
    dateListed: realState.DateListed,
    description: realState.Description,
    id: realState.Id,
    location: realState.Location,
    parking: realState.Parking,
    pictureURL: realState.PictureURL,
    salePrice: realState["Sale Price"],
    sqft: realState.Sqft,
    thumbnailURL: realState.ThumbnailURL,
    title: realState.Title,
    yearBuilt: realState.YearBuilt,
  }));
};
