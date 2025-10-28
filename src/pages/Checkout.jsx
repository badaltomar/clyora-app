import { useState } from "react";
import Header from "../components/common/Header";
import PriceDetailsBox from "../components/common/PriceDetailsBox";
import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import "./Checkout.css";
import Footer from "../components/common/Footer";

const BASE_URL = "https://clyora-app-backend.vercel.app";

function CheckoutMain() {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const {
    cart,
    setCart,
    allAddressList,
    getDiscountedPrice,
    getEachProductTotal,
  } = useProductContext();
  const [orderSuccessfull, setOrderSuccessfull] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(
    allAddressList.findIndex((adrs) => adrs.isDefault)
  );

  async function handleOrderSuccessfull() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
      });

      setCart([]);
      setOrderSuccessfull(true);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  function handleDeliveryAddress(index) {
    setSelectedAddressIndex(index);
  }

  const selectedAddress = allAddressList[selectedAddressIndex];

  return (
    <main className="pb-5">
      <div
        className={`pageLoadAnimation ${
          orderSuccessfull ? "container-fluid" : "container py-3"
        }`}
      >
        <br />
        {orderSuccessfull ? (
          <div className="order-success-container">
            <div className="order-success-card fade-in">
              <div className="icon-wrapper bounce">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                  alt="Success"
                  className="success-icon"
                />
              </div>
              <h3 className="title">Order Placed Successfully 🎉</h3>
              <p className="message">
                Thank you for shopping with us! Your order has been confirmed
                and will be shipped in 2-3 business days.
              </p>
              <Link to={"/"} className="btn-back">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="card shadow-sm p-3 mb-4 border-0 rounded-4">
                <h4 className="fw-bold mb-0 text-dark border-bottom pb-2">
                  Select Delivery Address
                </h4>
                <p className="text-muted small mt-1 mb-0">
                  Choose where you’d like your order delivered
                </p>
              </div>

              {allAddressList.length > 0 &&
                allAddressList.map((adrs, index) => (
                  <div
                    key={index}
                    className={`address-card card border-0 mb-3 shadow-sm rounded-4 ${
                      selectedAddressIndex === index ? "address-selected" : ""
                    }`}
                    onClick={() => handleDeliveryAddress(index)}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="fw-semibold mb-1">{adrs.name}</h5>
                          <p className="mb-1 text-secondary">
                            <i className="bi bi-geo-alt me-1"></i>
                            {adrs.address}, {adrs.city}, {adrs.state} -{" "}
                            {adrs.pincode}
                          </p>
                          <p className="mb-1 text-secondary">
                            <i className="bi bi-telephone me-1"></i>
                            {adrs.phone}
                          </p>
                          <small className="text-muted">
                            <i className="bi bi-truck me-1"></i>{" "}
                            {adrs.addressType}
                          </small>
                        </div>

                        <div>
                          {adrs.isDefault && (
                            <span className="badge bg-success rounded-pill px-3">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {allAddressList.length === 0 && (
                <div className="text-center bg-white shadow-sm p-5 rounded-4 border mt-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="No Address"
                    width="90"
                    className="mb-3 opacity-75"
                  />
                  <h5 className="fw-semibold text-dark mb-2">
                    No Delivery Address Found
                  </h5>
                  <p className="text-muted small mb-4">
                    You haven’t added any delivery addresses yet. Please add one
                    to continue with your order.
                  </p>
                  <Link
                    to="/userProfile"
                    className="btn btn-primary px-4 rounded-pill fw-semibold shadow-sm"
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Address
                  </Link>
                </div>
              )}

              {/* Order Summary: */}
              <div className="card shadow-sm p-3 mb-3 border-0 rounded-4">
                <h4 className="fw-bold mb-0 text-dark border-bottom pb-2">
                  Order Summary
                </h4>
                <p className="mb-0 fw-bold text-muted py-1">
                  Total {cart.length === 1 && "Item" || "Items"}: {cart.length}
                </p>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-7">
                  {cart.map((prod) => (
                    <div
                      key={prod.id}
                      className="cart-item-card border rounded border-secondary shadow-sm p-2 mb-3 bg-white"
                    >
                      <div className="row align-items-center">
                        {/* Product Image */}
                        <div className="col-12 col-sm-3 text-center mb-3 mb-sm-0">
                          <div>
                            <img
                              src={prod.thumbnail}
                              alt={prod.title}
                              className="img-fluid rounded bg-light"
                              style={{ maxHeight: "120px", objectFit: "cover" }}
                            />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="col-12 col-sm-5 text-center text-sm-start">
                          <div className="text-dark">
                            <h5 className="mb-1 fw-normal">{prod.title}</h5>
                            <span className="fw-semibold me-2 ">
                              ${getDiscountedPrice(prod)}
                            </span>
                            <small>
                              <span className="text-muted text-decoration-line-through me-2">
                                ${prod.price.toFixed(1)}
                              </span>
                              <span className="fw-semibold text-success">
                                {prod.discountPercentage.toFixed(1)}% Off
                              </span>
                            </small>
                          </div>
                        </div>

                        {/* Quantity & Total */}
                        <div className="col-12 col-sm-4 text-center mt-3 mt-sm-0">
                          <div>
                            <h5 className="product-total text-primary opacity-75">
                              Quantity: {prod.quantity}{" "}
                              {prod.quantity === 1 ? "(item)" : "(items)"}
                            </h5>
                            <h5 className="product-total mt-2 text-muted">
                              Subtotal ${getEachProductTotal(prod)}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right section - Price summary */}
            <div className="col-lg-4 col-md-5">
              {selectedAddress && (
                <div className="selected-summary shadow-sm">
                  <h6>Delivering To:</h6>
                  <p>
                    <strong>{selectedAddress.name}</strong> (
                    {selectedAddress.phone})
                  </p>
                  <p>
                    {selectedAddress.address}, {selectedAddress.city},{" "}
                    {selectedAddress.state} - {selectedAddress.pincode}
                  </p>
                  <span className="badge bg-light text-dark mt-2">
                    {selectedAddress.addressType}
                  </span>
                </div>
              )}

              <PriceDetailsBox
                handleOrderSuccessfull={handleOrderSuccessfull}
                isAddressSelected={selectedAddress}
              />
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
    </main>
  );
}

export default function Checkout() {
  return (
    <div style={{ backgroundColor: "#f7faff", minHeight: "100vh" }}>
      <Header />
      <CheckoutMain />
      <Footer />
    </div>
  );
}
