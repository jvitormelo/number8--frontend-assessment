import { getRealEstate } from "@/modules/real-state/api/get-real-state";
import { RealEstateDetailView } from "@/modules/real-state/views/real-estate-detail";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentProps } from "react";

type Params = {
  slug: string;
};

type Props = ComponentProps<typeof RealEstateDetailView>;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const realEstates = await getRealEstate();
  return {
    paths: realEstates.map((realEstate) => ({
      params: { slug: realEstate.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug as string;

  const realEstates = await getRealEstate();

  const realEstate = realEstates.find((realEstate) => realEstate.slug === slug);

  return {
    notFound: !realEstate,
    props: {
      realEstate: realEstate!,
    },
  };
};

export default RealEstateDetailView;
