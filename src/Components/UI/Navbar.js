import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
//react-roter-dom
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//react-redux
import { useSelector, useDispatch } from "react-redux";
import { basketCountUpdate, favoritesUpdate } from "../../Store/product-slice";
//mui icon
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
const pages = ["/", "/contact"];
const pagesNames = ["Home", "Contact"];

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [basketCount, setBasketCount] = useState(0);
  const basketCountSelector = useSelector((state) => state.product.basketCount);
  const favoritesSelector = useSelector((state) => state.product.favorites);

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    if (localStorage.getItem("basket-count")) {
      const basketCount = localStorage.getItem("basket-count");
      dispatch(basketCountUpdate(Number(basketCount)));
    }
    if (localStorage.getItem("favorites")) {
      const array = localStorage.getItem("favorites").split(",");
      dispatch(favoritesUpdate(array));
    }
  }, []);

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#FFA451", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={`${page}`} className="nav-link-mobile">
                    {pagesNames[index]}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "flex",
                justifyContent: "flex-end",
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "baseline",
                },
              }}
            >
              {pages.map((page, index) => (
                <Link
                  to={`${page}`}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  className="nav-link"
                >
                  {pagesNames[index]}
                </Link>
              ))}
            </Box>

            <div className="navbar-basket">
              <div className="navbar-basket-inner">
                <FavoriteIcon />
                <p>{favoritesSelector.length}</p>
              </div>

              <div>
                <Link to="/checkout" className="navbar-basket-inner">
                  <ShoppingBasketIcon />
                  <p>{basketCountSelector}</p>
                </Link>
              </div>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
