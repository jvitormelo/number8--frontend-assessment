import { RealStateFilters } from "@/modules/real-state/types";

type Props = {
  filter: RealStateFilters;
  setFilter: (filter: Partial<RealStateFilters>) => void;
};

export const RealStateFilterSection = ({}: Props) => {
  return <div></div>;
};
