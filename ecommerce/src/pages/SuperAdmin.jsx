import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faSitemap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { useState } from "react";
import SellerList from "./components/SellerList";
import { Create } from "@mui/icons-material";
import CreateSubCategory from "./components/CreateSubCategory";
import CreateMainCategory from "./components/CreateMainCategory";

function SuperAdmin() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Super Admin</h1>
      </div>
      <MDBRow>
        <MDBCol md="4">
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem onClick={() => setSelectedIndex(1)}>
                <ListItemButton>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faUser} />
                  </ListItemIcon>
                  <ListItemText primary="Seller's List" />
                </ListItemButton>
              </ListItem>
              <ListItem onClick={() => setSelectedIndex(2)}>
                <ListItemButton>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faBoxesStacked} />
                  </ListItemIcon>
                  <ListItemText primary="Product's List" />
                </ListItemButton>
              </ListItem>
              <ListItem onClick={() => setSelectedIndex(3)}>
                <ListItemButton>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faSitemap} />
                  </ListItemIcon>
                  <ListItemText primary="Create Sub Category" />
                </ListItemButton>
              </ListItem>
              <ListItem onClick={() => setSelectedIndex(4)}>
                <ListItemButton>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faSitemap} />
                  </ListItemIcon>
                  <ListItemText primary="Create Main Category" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </MDBCol>
        <MDBCol md="8">
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
            }}
          >
            <Divider />
            <Box
              component="span"
              sx={{ display: "flex", justifyContent: "center", padding:'1rem' }}
            >
              {selectedIndex === 1 && (
                <h5>
                  <FontAwesomeIcon icon={faUser} /> Seller's List
                  <SellerList />
                </h5>
              )}
              {selectedIndex === 2 && (
                <h5>
                  <FontAwesomeIcon icon={faBoxesStacked} /> Product's List
                </h5>
              )}
              {selectedIndex === 3 && (
                <h5>
                  <FontAwesomeIcon icon={faSitemap} /> Create Sub Category
                  <CreateSubCategory />
                </h5>
              )}
              {selectedIndex === 4 && (
                <h5>
                  <FontAwesomeIcon icon={faSitemap} /> Create Main Category
                  <CreateMainCategory />
                </h5>
              )}
            </Box>
          </Box>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default SuperAdmin;
