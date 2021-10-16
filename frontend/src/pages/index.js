import * as React from "react";
import { Layout } from "../components/ui/layout";
import { HeroBlock } from "../components/home/HeroBlock";
import { PromotionalProducts } from "../components/home/PromotionalProducts";
import { FeaturedProductions } from "../components/home/FeaturedProductions";
import { MarketingButtons } from "../components/home/MarketingButtons";
import { CallAction } from "../components/home/CallAction";

const IndexPage = () => {
  return (
    <Layout>
      <HeroBlock />
      <PromotionalProducts />
      <FeaturedProductions />
      <MarketingButtons />
      <CallAction />
    </Layout>
  );
};

export default IndexPage;
