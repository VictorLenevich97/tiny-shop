import React from "react";
import { Grid, Typography, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "gatsby";

import marketingAdornment from "../../images/marketing-adornment.svg";
import moreByUs from "../../images/more-by-us.svg";
import store from "../../images/store.svg";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundImage: `url(${marketingAdornment})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "50rem",
    width: "50rem",
    transition: "transform 0.5s easy",

    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  container: {
    margin: "15rem 0",
  },
}));

export const MarketingButtons = ({}) => {
  const classes = useStyles();

  const buttons = [
    { label: "Store", icon: store, link: "/hoodies" },
    { label: "More By Us", icon: moreByUs, href: "https://www.google.com" },
  ];

  return (
    <Grid
      container
      justify="space-around"
      classes={{ root: classes.container }}
    >
      {buttons.map((button) => (
        <Grid item>
          <Grid
            classes={{ root: classes.button }}
            container
            justify="center"
            alignItems="center"
            direction="column"
            component={button.link ? Link : "a"}
            to={button.link ? button.link : undefined}
            href={button.href ? button.href : undefined}
          >
            <Grid item>
              <img src={button.icon} alt={button.label} />
            </Grid>
            <Grid item>
              <Typography variant="h1">{button.label}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
