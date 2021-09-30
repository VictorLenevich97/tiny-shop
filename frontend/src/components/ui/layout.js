import React from "react";
import { Header } from "./header";
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
      <main>{children}</main>
      <footer></footer>
    </>
  );
};
