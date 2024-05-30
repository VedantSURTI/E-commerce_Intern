import {
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const fetchFeaturedProducts = async (category) => {
  try {
    const response = await axios.get(
      "http://192.168.20.173:5000/api/customer/products/featured",
      { params: { category } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

function TrendingArea({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchFeaturedProducts(category);
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <h2>{category}</h2>
      <MDBRow>
        {products.map((product) => (
          <MDBCol key={product._id} md="4">
            <MDBCard>
              <MDBCardImage
                src={
                  product.imageUrl[0] ||
                  "https://mdbootstrap.com/img/new/standard/nature/184.webp"
                }
                position="top"
                alt={product.name}
              />
              <MDBCardBody>
                <MDBCardTitle>{product.name}</MDBCardTitle>
                <MDBCardText>{product.description}</MDBCardText>
                <MDBBtn onClick={() => navigate(`/product/${product._id}`)}>
                  View Details
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </>
  );
}

function Outlet() {
  return (
    <>
      <div className="outlet-container">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <h1>Welcome to one of the best E-commerce websites</h1>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div className="outlet-info">
        <MDBRow>
          <MDBCol>
            <h3>10+</h3>
            <p>Years on the market</p>
          </MDBCol>
          <MDBCol>
            <h3>10+</h3>
            <p>Years on the market</p>
          </MDBCol>
          <MDBCol>
            <h3>1000+</h3>
            <p>Global Partners</p>
          </MDBCol>
          <MDBCol>
            <h3>10000+</h3>
            <p>Daily visitors on website</p>
          </MDBCol>
        </MDBRow>
      </div>
      <MDBContainer>
        <h2 style={{ margin: "50px 0px" }}>Trending Products</h2>
        <TrendingArea category={"Electronics"} />
        <TrendingArea category={"Grocery"} />
        <TrendingArea category={"Furniture"} />
      </MDBContainer>
    </>
  );
}

function HomePage() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomePage;
