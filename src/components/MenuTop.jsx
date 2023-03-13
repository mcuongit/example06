import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { MoreVert } from "@mui/icons-material";

function MenuTop() {
  const s = {
    root: {
      width: "100%",
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    linkTo: {
      textDecoration: "none",
      color: "#000",
    },
    linkHome: {
      textDecoration: "none",
      color: "#fff",
    },
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      id={menuId}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      anchorEl={anchorEl}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/products"} style={s.linkTo}>
          Product
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/categories"} style={s.linkTo}>
          Category
        </Link>
      </MenuItem>
    </Menu>
  );
  return (
    <div style={s.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={s.title}>
            <Link to={"/"} style={s.linkHome}>
              DEMO React ASP Core
            </Link>
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="MoreVert"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default MenuTop;
