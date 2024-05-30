// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Archive,
  Favorite,
  LocationOn,
  Home,
  KeyboardArrowUp,
} from "@mui/icons-material";

const Footer = () => {
  const [value, setValue] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
  };

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}>
        <button className="floating-button"></button>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleNavigationChange}>
          <BottomNavigationAction label="Recents" icon={<Home />} />
          <BottomNavigationAction label="Favorites" icon={<Favorite />} />
          <BottomNavigationAction label="Archive" icon={<Archive />} />
          <BottomNavigationAction label="Location On" icon={<LocationOn />} />
        </BottomNavigation>
        <Link to="/article/write">
          <button className="floating-button">
            <CreateIcon />
          </button>
        </Link>
      </Paper>
      {showButton && (
        <IconButton
          className={"topButton"}
          onClick={moveToTop}
          aria-label="move to top">
          <KeyboardArrowUp />
        </IconButton>
      )}
    </>
  );
};

export default Footer;