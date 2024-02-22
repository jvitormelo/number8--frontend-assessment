import { useLocalStorage } from "@mantine/hooks";
import { RealEstate } from "../types";

type SavedRealEstate = Pick<RealEstate, "id" | "title" | "slug">;

export function useSavedProperties() {
  const [savedProperties, setSavedProperties] = useLocalStorage<
    SavedRealEstate[]
  >({
    key: "saved-properties",
    defaultValue: [],
  });

  return { savedProperties, setSavedProperties };
}
