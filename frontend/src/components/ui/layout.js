import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { useStaticQuery, graphql } from "gatsby";

export const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query GetCategories {
      allStrapiCategory {
        edges {
          node {
            name
            strapiId
          }
        }
      }
    }
  `);

  return (
    <>
      <Header categories={data.allStrapiCategory.edges} />
      <div style={{ marginBottom: "10rem" }} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
