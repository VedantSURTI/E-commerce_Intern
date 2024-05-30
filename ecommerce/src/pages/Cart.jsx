import React, { useEffect, useState } from "react";
import axiosInstance from "./../axiosInstance";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
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

function Cart() {
  const [cart, setcart] = useState([]);
  const token = useSelector((state) => state.auth.token); // Get token from Redux store

  const addToCart = async (productId, token) => {
    try {
      const response = await axiosInstance.post(
        "/customer/products/add-to-cart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const deleteFromcart = async (productId) => {
    try {
      await axiosInstance.delete(
        `/customer/products/delete-from-cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product removed from cart successfully");
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleDelete = async (productId) => {
    await deleteFromcart(productId);
    setcart((prevcart) => prevcart.filter((item) => item._id !== productId));
  };

  useEffect(() => {
    document.title = "Cart - E-Shopping";

    async function getcart() {
      try {
        const response = await axiosInstance.get("/customer/products/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setcart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    getcart();
  }, [token]);

  const NumberButton = ({ initialCount, onIncrement, onDecrement }) => {
    const [count, setCount] = useState(initialCount);

    const handleIncrement = () => {
      setCount(count + 1);
      if (onIncrement) {
        onIncrement(count + 1);
      }
    };

    const handleDecrement = () => {
      if (count > initialCount) {
        setCount(count - 1);
        if (onDecrement) {
          onDecrement(count - 1);
        }
      }
    };
    return (
      <div className="number-button">
        <button className="decrement-button" onClick={handleDecrement}>
          -
        </button>
        <span className="number-display">{count}</span>
        <button className="increment-button" onClick={handleIncrement}>
          +
        </button>
      </div>
    );
  };
  return (
    <div>
      <NavBar />
      <h2 style={{ display: "flex", justifyContent: "center" }}>Cart</h2>
      <MDBRow>
        {cart.length > 0 ? (
          cart.map((product) => (
            <MDBCol key={product._id} md="4">
              <MDBCard className="wishlist-card">
                <MDBCardImage
                  className="wishlist-card-img-top"
                  src={
                    product.imageUrl[0] ||
                    "https://mdbootstrap.com/img/new/standard/nature/184.webp"
                  }
                  position="top"
                  alt={product.name}
                />
                <MDBCardBody className="wishlist-card-body">
                  <MDBCardTitle>{product.name}</MDBCardTitle>
                  <MDBCardText>{product.description}</MDBCardText>
                  <MDBCardText>₹ {product.price}</MDBCardText>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Quantity</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <NumberButton initialCount={1} />
                    </MDBCol>
                  </MDBRow>
                  <MDBBtn
                    color="danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete form cart
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))
        ) : (
          <p style={{ display: "flex", justifyContent: "center" }}>
            No items in your cart.
          </p>
        )}
      </MDBRow>
      <Footer />
    </div>
  );
}

export default Cart;
