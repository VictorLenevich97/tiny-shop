import React from "react";
import { Typography, Grid, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "gatsby";

import facebook from "../../images/facebook.svg";
import twitter from "../../images/twitter.svg";
import instagram from "../../images/instagram.svg";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: "2rem",
  },
  link: {
    color: "#fff",
    fontSize: "1.5rem",
  },
  linkColumn: {
    width: "20rem",
  },
  spacer: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  linkContainer: {
    [theme.breakpoints.down("md")]: {
      marginBottom: "3rem",
    },
  },
  icon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "@global": {
    body: {
      margin: 0,
    },
    a: {
      textDecoration: "none",
    },
  },
}));

export const Footer = () => {
  const classes = useStyles();

  const socialMedia = [
    { icon: facebook, alt: "facebook", link: "https://facebook.com" },
    { icon: twitter, alt: "twitter", link: "https://twitter.com" },
    { icon: instagram, alt: "instagram", link: "https://instagram.com" },
  ];

  const routes = {
    "Contact Us": [
      { label: "(555) 555-5555", href: "tel:(555) 555-5555" },
      { label: "zachary@var-x.com", href: "mailto:zachary@var-x.com" },
    ],
    "Customer Service": [
      { label: "Contact Us", link: "/contact" },
      { label: "My account", link: "/account" },
    ],
    Information: [
      { label: "Privacy Policy", link: "/privacy-policy" },
      { label: "Terms and Conditions", link: "/terms-conditions" },
    ],
  };

  return (
    <footer className={classes.footer}>
      <Grid container justify="space-between">
        {/* Links */}
        <Grid item classes={{ root: classes.linkContainer }}>
          <Grid container>
            {Object.keys(routes).map((category) => (
              <Grid
                key={category}
                item
                container
                direction="column"
                classes={{ root: classes.linkColumn }}
              >
                <Grid item>
                  <Typography variant="h5">{category}</Typography>
                </Grid>

                {routes[category].map(({ label, link, href }) => (
                  <Grid
                    key={label}
                    item
                    component={link ? Link : "a"}
                    href={href ? href : undefined}
                    to={link ? link : undefined}
                  >
                    <Typography
                      variant="body1"
                      classes={{ body1: classes.link }}
                    >
                      {label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Social media Icons */}
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {socialMedia.map(({ icon, alt, link }) => (
              <Grid item key={alt}>
                <IconButton
                  classes={{ root: classes.icon }}
                  component="a"
                  href={link}
                  disableRipple
                >
                  <img src={icon} alt={alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};
