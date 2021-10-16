import React from "react";
import { makeStyles } from "@material-ui/core";
import { Header } from "./header";
import { Footer } from "./footer";
import { useStaticQuery, graphql } from "gatsby";

const useStyles = makeStyles((theme) => ({
  spacer: {
    marginBottom: "10rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2rem",
    },
  },
}));

export const Layout = ({ children }) => {
  const classes = useStyles();

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
      <div className={classes.spacer} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
