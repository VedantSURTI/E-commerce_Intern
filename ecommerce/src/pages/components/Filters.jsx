import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import Slider from "@mui/material/Slider";
import Dropdown from "./Dropdown";
function Filters({
  subcategories_names,
  brands_names,
  subcategory,
  brand,
  maxPrice,
  onChangeCategory,
  onChangeBrand,
  sort_names,
  onChangeSort,
  onChangeMaxPrice,
  sort,
  onClickFilter,
})
 {
  return (
    <div>
      <MDBCard>
        <MDBCardBody>
          <MDBRow>
            <MDBCol>
              <Dropdown
                subcategories={subcategories_names}
                name={"Sub Categories"}
                value={subcategory}
                handleChange={onChangeCategory}
              />
            </MDBCol>
            <MDBCol>
              <Dropdown
                subcategories={brands_names}
                name={"Brands"}
                value={brand}
                handleChange={onChangeBrand}
              />
            </MDBCol>
            <MDBCol>
              <Dropdown
                subcategories={sort_names}
                name={"Sort by"}
                value={sort}
                handleChange={onChangeSort}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCardText style={{ marginTop: "20px" }}>
              Select Price
            </MDBCardText>
            <MDBCol sm="3">
              <Slider
                min={500}
                max={50000}
                valueLabelDisplay="auto"
                shiftStep={30}
                step={500}
                marks
                value={maxPrice}
                onChange={onChangeMaxPrice}
              />
            </MDBCol>
            <MDBCol sm="9">
              <MDBBtn onClick={onClickFilter}>Filter</MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default Filters;
