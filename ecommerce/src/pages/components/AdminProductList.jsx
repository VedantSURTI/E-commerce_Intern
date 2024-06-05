import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import axiosInstance from "../../axiosInstance";
import { useSelector } from "react-redux";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { CardTitle } from "react-bootstrap";

const fetchproductsData = async (token) => {
  try {
    const response = await axiosInstance.get("/customer/products/allProducts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw error;
  }
};

export default function AdminProductList() {
  const [products, setproducts] = React.useState([]);
  const token = useSelector((state) => state.auth.token);

  React.useEffect(() => {
    const getproducts = async () => {
      try {
        const data = await fetchproductsData(token);
        setproducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getproducts();
  }, [token]);
  console.log(products);
  return (
    <MDBRow>
      {products.map((product) => (
        <MDBCol md="3">
          <div style={{ marginTop: "1rem" }}>
            <Card
              key={product.id}
              variant="outlined"
              color="danger"
              invertedColors
              className="admin-product-card"
            >
              <CardContent orientation="horizontal">
                <CardContent>
                  <CardTitle level="body-md">{product.name}</CardTitle>
                  <Typography level="body-md">{product.description}</Typography>
                  <Typography level="body-md">₹ {product.price}</Typography>
                  <Typography level="body-md">
                    Stock: {product.stock}
                  </Typography>
                  <Typography level="body-md">
                    Seller Details : {product.seller.firstName}{" "}
                    {product.seller.lastName}
                  </Typography>
                </CardContent>
              </CardContent>
              <CardActions>
                <Button variant="soft" size="sm" color="danger">
                  Delete product
                </Button>
              </CardActions>
            </Card>
          </div>
        </MDBCol>
      ))}
    </MDBRow>
  );
}
