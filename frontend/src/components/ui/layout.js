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
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45 rem`,
        }}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};
