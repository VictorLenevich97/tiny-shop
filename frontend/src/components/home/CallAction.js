import React from "react";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { Link } from "gatsby";

import cta from "../../images/cta.svg";

const useStyles = makeStyles((theme) => ({
  account: {
    color: "#fff",
    marginLeft: "2rem",
  },
  body: {
    maxWidth: "45rem",
  },
  container: {
    marginBottom: "30rem",
  },
  buttonContainer: {
    marginTop: "3rem",
  },
}));

export const CallAction = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img src={cta} alt="quality committed" />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">Commited To Quality</Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography variant="body1">
              Quick question: When was the last time you purchased something
              online? Yesterday? This morning? Ok, cool. So when do you think
              you’ll next purchase something online? Tomorrow? Tonight? No
              shame—me too.
            </Typography>
          </Grid>
          <Grid item container classes={{ root: classes.buttonContainer }}>
            <Grid item>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                color="primary"
              >
                Contact Us
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/account"
                variant="contained"
                color="primary"
                classes={{ root: classes.account }}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
