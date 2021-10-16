import React, { useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Button,
  makeStyles,
  useMediaQuery,
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

    [theme.breakpoints.down("lg")]: {
      padding: "20rem 2rem 2rem 2rem",
    },
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
    [theme.breakpoints.down("md")]: {
      height: "25rem",
      width: "20rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "15rem",
    },
  },
  carouselContainer: {
    marginLeft: "20rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      height: "30rem",
    },
  },
  space: {
    margin: "0 15rem 10rem 15rem ",
    [theme.breakpoints.down("sm")]: {
      margin: "0 10rem 10rem 10rem ",
    },
  },
  explore: {
    textTransform: "none",
    marginRight: "2rem",
  },
  descriptionContainer: {
    textAlign: "right",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
}));

export const PromotionalProducts = () => {
  const mathcesMD = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
                  {name.split(" ")[0]}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        ),
        description: description,
      })
  );

  return (
    <Grid
      container
      justify={mathcesMD ? "space-arround" : "space-between"}
      alignItems="center"
      classes={{ root: classes.mainContainer }}
      direction={mathcesMD ? "column" : "row"}
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
