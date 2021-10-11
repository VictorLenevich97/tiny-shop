import React, { useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useStaticQuery, graphql } from "gatsby";
import Carousel from "react-spring-3d-carousel";
import clsx from "clsx";

import promoAdornment from "../../images/promo-adornment.svg";
import explore from "../../images/explore.svg";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundImage: `url(${promoAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "70rem",
    padding: "30rem 10rem 10rem 10rem",
  },
  productName: {
    color: "#fff",
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  carouselImage: {
    height: "30rem",
    width: "25rem",
    backgroundColor: "#fff",
    borderRadius: 20,
    boxShadow: theme.shadows[5],
  },
  carouselContainer: {
    marginLeft: "20rem",
  },
  space: {
    margin: "0 15rem ",
    marginBottom: "5rem",
  },
  explore: {
    textTransform: "none",
    marginRight: "2rem",
  },
  descriptionContainer: {
    textAlign: "right",
  },
}));

export const PromotionalProducts = () => {
  const classes = useStyles();
  const [selectedSlide, setSelectedSlide] = useState(0);

  const data = useStaticQuery(graphql`
    query MyQuery {
      allStrapiProduct(filter: { promo: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            description
            variants {
              images {
                url
              }
            }
          }
        }
      }
    }
  `);

  let slides = [];

  data.allStrapiProduct.edges.map(
    ({ node: { name, variants, description } }, i) =>
      slides.push({
        key: i,
        content: (
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton
                onClick={() => setSelectedSlide(i)}
                disableRipple
                classes={{
                  root: clsx(classes.iconButton, {
                    [classes.space]: selectedSlide !== i,
                  }),
                }}
              >
                <img
                  src={
                    process.env.GATSBY_STRAPI_URL + variants[0].images[0].url
                  }
                  alt={`image-${i}`}
                  className={classes.carouselImage}
                />
              </IconButton>
            </Grid>
            <Grid item>
              {selectedSlide === i ? (
                <Typography
                  variant="h1"
                  classes={{ root: classes.productName }}
                >
                  {name}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        ),
        description: description,
      })
  );

  console.log(data);

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      classes={{ root: classes.mainContainer }}
    >
      <Grid item classes={{ root: classes.carouselContainer }}>
        <Carousel slides={slides} goToSlide={selectedSlide} />
      </Grid>
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography variant="h2" paragraph>
          {slides[selectedSlide].description}
        </Typography>
        <Button>
          <Typography variant="h4" classes={{ root: classes.explore }}>
            Explore
          </Typography>
          <img src={explore} alt="go to explore page" />
        </Button>
      </Grid>
    </Grid>
  );
};
