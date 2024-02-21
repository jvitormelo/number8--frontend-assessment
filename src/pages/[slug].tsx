import { allRealEstateData } from "@/modules/real-estate/data";
import { RealEstateDetailView } from "@/modules/real-estate/views/real-estate-detail";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentProps } from "react";

type Params = {
  slug: string;
};

type Props = ComponentProps<typeof RealEstateDetailView>;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: allRealEstateData.map((realEstate) => ({
      params: { slug: realEstate.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug as string;

  const realEstate = allRealEstateData.find(
    (realEstate) => realEstate.slug === slug
  );

  return {
    notFound: !realEstate,
    props: {
      realEstate: realEstate!,
    },
  };
};

export default RealEstateDetailView;
