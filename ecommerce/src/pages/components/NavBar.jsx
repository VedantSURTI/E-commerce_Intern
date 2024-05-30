import NavDropdown from "react-bootstrap/NavDropdown";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const authState = useSelector((state) => state.auth);
  // console.log(authState.user.email);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <NavLink style={{ color: "white" }} to="/">
              E-commerce
            </NavLink>
          </Typography>

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
              <NavLink to="/electronics">Electronics</NavLink>
              <br />
              <NavLink to="/grocery">Grocery</NavLink>
              <br />
              <NavLink to="/fashion">Fashion</NavLink>
              <br />
              <NavLink to="/furniture">Furniture</NavLink>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-commerce
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <NavLink to="/electronics">Electronics</NavLink>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <NavLink to="/grocery">Grocery</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/furniture">Furniture</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Box>
          {authState.token !== "" && (
            <>
              <NavLink
                to="/cart"
                style={{ color: "white", marginRight: "1rem" }}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </NavLink>
              <NavLink
                to="/wishlist"
                style={{ color: "white", marginRight: "1rem" }}
              >
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
            </>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              {authState.token === "" ? (
                <MenuItem key="login" onClick={handleCloseUserMenu}>
                  <NavLink to="/login" textAlign="center">
                    Login
                  </NavLink>
                </MenuItem>
              ) : (
                ""
              )}

              {authState.user.email !== "" ? (
                <MenuItem key="profile" onClick={handleCloseUserMenu}>
                  <NavLink to="/profile" textAlign="center">
                    Profile
                  </NavLink>
                </MenuItem>
              ) : null}
              {authState.seller.email !== "" ? (
                <MenuItem key="dashboard" onClick={handleCloseUserMenu}>
                  <NavLink to="/dashboard" textAlign="center">
                    Dashboard
                  </NavLink>
                </MenuItem>
              ) : null}
              {authState.token !== "" ? (
                <MenuItem key="logout" onClick={handleCloseUserMenu}>
                  <NavLink to="/logout" textAlign="center">
                    Logout
                  </NavLink>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
