import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));
const Navbar = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [check, setCheck] = React.useState(false);

  const linksLIst = [
    {
      id: "1",
      title: "contact",
      href: "/contact",
    },
  ];

  // Links List
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {linksLIst.map((text, index) => (
          <ListItem button key={index}>
            <Link href={text.href}>
              <a>
                <ListItemText primary={text.title} />
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // toogle
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar elevation={1} color="white" position="static">
        <Toolbar>
          <Hidden mdUp>
            <Box>
              {[""].map((anchor) => (
                <React.Fragment key={anchor}>
                  <IconButton
                    onClick={toggleDrawer(anchor, true)}
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                  >
                    <MenuIcon />
                    {anchor}
                  </IconButton>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </Box>
          </Hidden>

          <Typography variant="h6" className={classes.title}>
            <Link href="https://training.zuri.team/">
              <a>
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAAAdCAYAAACjQS76AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARDSURBVHgB7ZrBbtNAEIZ/p3Avx0pI3d4qOJBW3GuegPIENU9A+wQ1T9D2CVKeoOUJEu6oLRKquGVvPSZcEAeI8ci2Ml6PHRJ7nTTaTxrVu2uvd3Znd8aTAg6Hw+FwOBwOh8PhcKwCKpV1RKF53bqxbGIFCGOJ5pAe2uGMvfMIixNiPv1IfNiF63aMZuin/Q2RGNdS6GB1od3GJ/sd1guuW50Nk+FjuhFULB+wJBY1qp+wzzgWzcojrBeaXd+hPtTHmJW/YIVRyLuFIdqLcVQs50jcV9NxQuYq2nTnHIXmdSOXR7o05U6tQUbUZqzRFss2qrVllvs7Rf5U+hjLwLiHFqSfihkcbrK2/oznuuk1GfF2es8Zu+cQ7SKNPUive8K9NFfDVG4xjWl4H9vsGa5bwOq7rP7KeG/WN71foUjZWvis/oyN95b1mdVLSPplY6ha/wI+im5Pgp9kvtGmjD7KniOFRqycTT4/TQI0y6yTSiE/9lN2zTdI1xg7l1ujvF3y/pDV+8jPeb+kbykMKVuLwHhuWDFeaR6GFWMYme8sO6moox4rUwD4BvagGGAlcisVhEKdQnKa8LGPMQ2Y637WK0yNQwtti8ROClNj1EZbV+izj/IYmuoL61ZmVKcouj0Nu9BCXKTvauPrchEGSMb4KS2b83QSy7NUKAWiUR8dyw4T/qX4FotB43/G+tSs7RW7DpDX7yJ9zotlD3PoF2C+RGcT7k86ygl+9Adolnnd35VwD9chFNp91HN/JOZpd8jaRhXj8Vl9YDyjjOdCyK79f+ao4P6eCDedsrJGcnLY5gI1d/XD/osAnnfgeRj/mUTfnt/cX6JZToQ6xa6vhfYB6kGnt5nD4uVFQgZ6Xht1uuRexa4/C+06lZzhm0bVMzp6D/tuj6iV/HvYf9mLD+SArqN4v2zElhUb2fbWzX2TG0IbZXNBy5KzYyweL46xOpTpUBgjj6nohPJZWUofzPviuoHqTJITSnCNnhc+vN71YQ8ekBN7wj0Kq/8BUgXf7EdCu4KQt+ywxpDVa8gxwiwO2DVN5hksM4kiv6wtmni2jZpPOumqWJn0v8Ljhv/U4yPxZNl/QVC5Lz2UGZUZhCnIeQkpaOMvPsY0OVgWfDeK53nLdBHcvSokeR4ypEx/6ye1ZS6Rd/sBEh3J1ZemGpr4L4VLo+ynLydrtr7gXqdzLdZH3tibRNewywB5wyKd6esswFT/VYqL5iXLT+qSdo0ZMdWiDCDnZLJ6q2x9/T6Ij6tcQE4GFW1MTrbufmjYJ4T8QTNAsiCP2agIjSSXRTrSJh2kf2nOKY4s6OehWRSSHarR8mQ+dHfVZONptxP93fw9+XW9c6eXsZiku0Lx33bWFYXEHWYfI5QYfeybyNECZDAUI/pCPcWPVb8bOhwiZgafAnSeubf1i4djjTlHdSag7Ccqh6MSOq0uMU0nkNBpJblF/ANqkrHSvAMviQAAAABJRU5ErkJggg=="
                  alt="Picture of the author"
                  width={50}
                  height={50}
                />
              </a>
            </Link>
          </Typography>

          <Hidden mdDown>
            <Button color="inherit">
              <Link href="/contact">
                <a> Contact</a>
              </Link>
            </Button>
            {/* <Button color="inherit">
              <Link href="/signup">
                <a> Sign Up</a>
              </Link>
            </Button> */}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
