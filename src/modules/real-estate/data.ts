import Mock from "@/../public/mock.json";
import { RealEstate } from "@/modules/real-estate/types";

// I didn't understand if was to fetch the JSON or copy the file to the project
// So i Went with the easiest way
const mapRealEstate = (): RealEstate[] => {
  return Mock.map((realState) => ({
    bathrooms: realState.Bathrooms,
    bedrooms: realState.Bedrooms,
    dateListed: realState.DateListed,
    description: realState.Description,
    id: realState.Id,
    location: realState.Location,
    parking: realState.Parking,
    salePrice: realState["Sale Price"],
    sqft: realState.Sqft,
    title: realState.Title,
    yearBuilt: realState.YearBuilt,
    slug: slugify(realState.Title, realState.Id),
    pictureURL: randomPicture(realState.Id, 350, 350),
    thumbnailURL: randomPicture(realState.Id, 150, 150),
  }));
};

function randomPicture(id: number, width: number, height: number) {
  return `https://picsum.photos/seed/${id}/${width}/${height}`;
}

// TODO > Move to utils
function slugify(text: string, id: number) {
  return text.toLowerCase().replace(/ /g, "-") + "-" + id;
}

export const allRealEstateData = mapRealEstate();
