import NavBar from "./components/NavBar";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  faUser,
  faBoxesStacked,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CreateProduct from "./components/CreateProduct";

function DashBoard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div>
      <NavBar />
      <MDBRow>
        <MDBCol md="4">
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem onClick={() => setSelectedIndex(1)}>
                <ListItemButton>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faBoxesStacked} />
                  </ListItemIcon>
                  <ListItemText primary="Create Product" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </MDBCol>
        <MDBCol md="8">{selectedIndex === 1 && <CreateProduct />}</MDBCol>
      </MDBRow>
    </div>
  );
}

export default DashBoard;
