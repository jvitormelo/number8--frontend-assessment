import Image from "next/image";

type Props = {
  realState: RealState;
};

export const RealStateCard = ({ realState }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-64 h-64 bg-white rounded-lg shadow-lg">
      <Image
        src={realState.thumbnailURL}
        alt={realState.title}
        width={150}
        height={150}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{realState.title}</h2>
        <p className="text-gray-500">{realState.description}</p>
        <p className="text-xl font-bold">{realState.salePrice}</p>
      </div>
    </div>
  );
};
