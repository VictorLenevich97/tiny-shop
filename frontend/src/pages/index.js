import * as React from "react";
import { Layout } from "../components/ui/layout";
import { HeroBlock } from "../components/home/HeroBlock";
import { PromotionalProducts } from "../components/home/PromotionalProducts";
import { FeaturedProductions } from "../components/home/FeaturedProductions";

const IndexPage = () => {
  return (
    <Layout>
      <HeroBlock />
      <PromotionalProducts />
      <FeaturedProductions />
    </Layout>
  );
};

export default IndexPage;
