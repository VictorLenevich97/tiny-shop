import React, { useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  makeStyles,
  Button,
  Chip,
} from "@material-ui/core";
import { useStaticQuery, graphql } from "gatsby";
import clsx from "clsx";

import featuredAdornment from "../../images/featured-adornment.svg";
import frame from "../../images/product-frame-grid.svg";
import explore from "../../images/explore.svg";

import { Rating } from "./Rating";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${featuredAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "240rem",
    padding: "2.5rem",
  },
  featured: {
    height: "20rem",
    width: "20rem",
  },
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 0,
    height: "24.8rem",
    width: "25rem",
    boxSizing: "border-box",
    boxShadow: theme.shadows[5],
    position: "absolute",
    zIndex: 1,
  },
  slide: {
    backgroundColor: theme.palette.primary.main,
    height: "20rem",
    width: "24.5rem",
    zIndex: 0,
    transition: "transform 0.5s ease",
    padding: "1rem 2rem",
  },
  slideLeft: {
    transform: "translate(-24.5rem, 0px)",
  },
  slideRight: {
    transform: "translate(24.5rem, 0px)",
  },
  productContainer: {
    margin: "5rem 0",
  },
  exploreContainer: {
    marginTop: "auto",
  },
  exploreButton: {
    textTransform: "none",
    marginRight: "2rem",
  },
  exploreIcon: {
    height: "1.5rem",
    marginLeft: "1rem",
  },
  chipLabel: {
    ...theme.typography.h5,
  },
  chipRoot: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const FeaturedProductions = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();

  const data = useStaticQuery(graphql`
    query GetFeaturedProducts {
      allStrapiProduct(filter: { featured: { eq: true } }) {
        edges {
          node {
            strapiId
            name
            variants {
              price
              images {
                url
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      classes={{ root: classes.background }}
    >
      {data.allStrapiProduct.edges.map(
        ({ node: { name, variants, strapiId } }, i) => {
          const alignment =
            i === 0 || i === 3
              ? "flex-start"
              : i === 1 || i === 4
              ? "center"
              : "flex-end";

          return (
            <Grid
              key={strapiId}
              item
              container
              justify={alignment}
              classes={{ root: classes.productContainer }}
              alignItems="center"
            >
              <IconButton
                onClick={() =>
                  expanded === i ? setExpanded(null) : setExpanded(i)
                }
                classes={{ root: classes.frame }}
              >
                <img
                  src={
                    process.env.GATSBY_STRAPI_URL + variants[0].images[0].url
                  }
                  alt={name}
                  className={classes.featured}
                />
              </IconButton>
              <Grid
                container
                direction="column"
                classes={{
                  root: clsx(classes.slide, {
                    [classes.slideLeft]:
                      expanded === i && alignment === "flex-end",
                    [classes.slideRight]:
                      expanded === i &&
                      (alignment === "flex-satert" || alignment === "center"),
                  }),
                }}
              >
                <Grid item>
                  <Typography variant="h4">{name.split(" ")[0]}</Typography>
                </Grid>
                <Grid item>
                  <Rating number={4.3} />
                </Grid>
                <Grid item>
                  <Chip
                    label={`$${variants[0].price}`}
                    classes={{
                      root: classes.chipRoot,
                      label: classes.chipLabel,
                    }}
                  />
                </Grid>
                <Grid item classes={{ root: classes.exploreContainer }}>
                  <Button classes={{ root: classes.exploreButton }}>
                    <Typography variant="h5">Details</Typography>
                    <img
                      src={explore}
                      alt="go to product details"
                      className={classes.exploreIcon}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          );
        }
      )}
    </Grid>
  );
};
