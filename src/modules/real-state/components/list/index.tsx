import { RealStateCard } from "@/modules/real-state/components/card";

type Props = {
  realState: RealState[];
};

export const RealStateList: React.FC<Props> = ({ realState }) => {
  return (
    <div className="flex flex-wrap">
      {realState.map((realState) => (
        <RealStateCard key={realState.id} realState={realState} />
      ))}
    </div>
  );
};
