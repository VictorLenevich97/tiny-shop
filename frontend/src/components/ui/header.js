import React, { useState } from "react";
import { Link } from "gatsby";
import {
  Button,
  Typography,
  Toolbar,
  AppBar,
  Tabs,
  Tab,
  IconButton,
  makeStyles,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import search from "../../images/search.svg";
import cart from "../../images/cart.svg";
import account from "../../images/account-header.svg";
import menu from "../../images/menu.svg";

const useStyles = makeStyles((theme) => ({
  coloredIndicator: {
    backgroundColor: "#fff",
  },
  logoText: {
    color: theme.palette.common.offBlack,
  },
  logoContainer: {
    [theme.breakpoints.down("md")]: {
      marginRight: "auto",
    },
  },
  listItemText: {
    color: "#fff",
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 600,
  },
  icon: {
    height: "3rem",
    width: "3rem",
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const Header = ({ categories }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();
  const matchesMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const routes = [
    ...categories,
    { node: { name: "Contact Us", strapiId: "contact", link: "/contact" } },
  ];

  const activeIndex = () => {
    const found = routes.indexOf(
      routes.filter(
        ({ node: { name, link } }) =>
          (link || `/${name.toLowerCase()}`) === window.location.pathname
      )[0]
    );

    return found === -1 ? false : found;
  };

  const tabs = (
    <Tabs
      value={activeIndex()}
      classes={{ indicator: classes.coloredIndicator, root: classes.tabs }}
    >
      {routes.map(({ node }) => (
        <Tab
          component={Link}
          to={node.link || `/${node.name.toLowerCase()}`}
          classes={{ root: classes.tab }}
          key={node.strapiId}
          label={node.name}
        />
      ))}
    </Tabs>
  );

  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {routes.map((route, i) => (
          <ListItem
            selected={activeIndex() === i}
            component={Link}
            to={route.node.link || `/${route.node.name.toLowerCase()}`}
            divider
            button
            key={route.node.strapiId}
          >
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={route.node.name}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );

  const actions = [
    {
      icon: search,
      alt: "search",
      visiable: true,
      link: "/search",
      onClick: () => console.log("search"),
    },
    { icon: cart, alt: "cart", visiable: true, link: "/cart" },
    { icon: account, alt: "account", visiable: !matchesMD, link: "/account" },
    {
      icon: menu,
      alt: "menu",
      visiable: matchesMD,
      onClick: () => setDrawerOpen(true),
    },
  ];

  return (
    <AppBar color="transparent" elevation={0}>
      <Toolbar>
        <Button
          component={Link}
          to="/"
          classes={{ root: classes.logoContainer }}
        >
          <Typography variant="h1">
            <span className={classes.logoText}>VAR</span> X
          </Typography>
        </Button>

        {matchesMD ? drawer : tabs}

        {actions.map(({ icon, alt, visiable, onClick, link }) => {
          if (visiable) {
            return (
              <IconButton
                key={alt}
                component={onClick ? undefined : Link}
                to={onClick ? undefined : link}
              >
                <img
                  className={classes.icon}
                  src={icon}
                  alt={alt}
                  onClick={onClick}
                />
              </IconButton>
            );
          }
        })}
      </Toolbar>
    </AppBar>
  );
};
