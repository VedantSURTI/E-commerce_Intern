import NavBar from "./components/NavBar";
import Filters from "./components/Filters";
import {
  MDBCard,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Pagination from "@mui/material/Pagination";

const subcategories_names = ["Earphone", "Laptop", "Phone"];
const brands_names = ["Samsung"];
const sort_names = ["ascending", "descending"];

const fetchProducts = async (token, category) => {
  try {
    const response = await axiosInstance.get("/customer/products/category", {
      params: { category },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};
function Electronics() {
  const authState = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const navigate = useNavigate();
  const category = "Electronics";
  // console.log(page);

  function handleChangecategory(e) {
    setSubcategory(e.target.value);
  }
  function handleChangebrand(e) {
    setBrand(e.target.value);
  }
  function handleChangeSort(e) {
    setSort(e.target.value);
  }
  function handleChangeMaxPrice(e) {
    setMaxPrice(e.target.value);
  }

  const getFilteredProducts = async (token, params) => {
    try {
      const response = await axiosInstance.get("/customer/products/category", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  useEffect(()=>{
    const handleFilterClick = async () => {
      const params = {
        category,
        subcategory,
        page,
        limit: 10,
        brand,
        priceMin: 100,
        maxPrice,
        sort,
      };
      console.log(params);
  
      try {
        const data = await getFilteredProducts(authState.token, params);
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    handleFilterClick();
  },[authState.token, category, page, subcategory, brand, maxPrice, sort])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(authState.token, category);
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [authState.token, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <NavBar />
      <Filters
        subcategories_names={subcategories_names}
        brands_names={brands_names}
        subcategory={subcategory}
        brand={brand}
        maxPrice={maxPrice}
        onChangeCategory={handleChangecategory}
        onChangeBrand={handleChangebrand}
        sort_names={sort_names}
        onChangeSort={handleChangeSort}
        onChangeMaxPrice={handleChangeMaxPrice}
        sort={sort}
        // onClickFilter={handleFilterClick}
      />
      <MDBRow style={{ marginRight: "0" }}>
        {products.map((product) => (
          <MDBCol key={product._id} md="4">
            <MDBCard style={{ margin: "1rem" }}>
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
                <MDBCardText>{product.price}</MDBCardText>
                <MDBBtn onClick={() => navigate(`/product/${product._id}`)}>
                  View Details
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      <Pagination
        className="pagination-style"
        onChange={(e) => {
          setPage(e.target.textContent);
        }}
        count={10}
      />
      <Footer />
    </div>
  );
}

export default Electronics;
