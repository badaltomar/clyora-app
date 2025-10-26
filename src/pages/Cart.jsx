import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import { useProductContext } from "../contexts/ProductContext";
import "./Cart.css";
import PriceDetailsBox from "../components/common/PriceDetailsBox";
import Footer from "../components/common/Footer";

const BASE_URL = "https://clyora-app-backend.vercel.app"

function CartMain() {
    window.scrollTo({ top: 0, behavior: "smooth" });

  const { cart, setCart, wishlist, setWishlist, allAddressList } =
    useProductContext();

  // Left section items logic:
  // ---- ---- ---- ----

  async function handleCartItemsQuantity(prodId, selectedBtn) {
  const item = cart.find((itm) => itm.id === prodId);
  if (!item) return;

  let newQuantity = item.quantity;
  if (selectedBtn === "increase") newQuantity++;
  if (selectedBtn === "decrease" && newQuantity > 1) newQuantity--;

  try {
    const res = await fetch(`${BASE_URL}/cart/${prodId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (res.ok) {
      setCart((prev) =>
        prev.map((itm) =>
          itm.id === prodId ? { ...itm, quantity: newQuantity } : itm
        )
      );
    }
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
}


  async function removeFromCart(prodId) {
    await fetch(`${BASE_URL}/cart/${prodId}`, {method: "DELETE"})
    setCart((prevItems) => prevItems.filter((itm) => itm.id !== prodId));
  }

  async function moveToWishlist(prod) {
    const exist = wishlist.find((itm) => itm.id === prod.id);
    if (exist) {
      alert("Already saved in your Wishlist❤️");
    } else {
      // Add to backend wishlist
      const res = await fetch(`${BASE_URL}/wishlist`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(prod)
      })
      const data = await res.json()
      setWishlist((prevList) => [...prevList, data.newProduct]);
      removeFromCart(prod.id);
    }
  }

  function getDiscountedPrice(prod) {
    return (prod.price - (prod.price * prod.discountPercentage) / 100).toFixed(
      1
    );
  }

  function getEachProductTotal(prod) {
    return (prod.quantity * Number(getDiscountedPrice(prod))).toFixed(1);
  }

  function renderDefaultAddress(allAddressList) {
    const defaultAddress = allAddressList.find((adrs) => adrs.isDefault);

    if (!defaultAddress) {
      return (
        <>
        <p className="mb-0 text-muted">
          No default address selected. Please add one.
        <Link
              to="/userProfile"
              className="badge text-bg-light border border-dark text-decoration-none float-end"
              style={{ whiteSpace: "nowrap"}}
              >
              Saved Address
        </Link>
                </p>
        </>
      );
    }

    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
          <div>
            Deliver to:&nbsp;
            <span className="fw-semibold">
              {defaultAddress.name}, {defaultAddress.pincode}
            </span>
            <span className="ms-2 badge bg-light text-dark border">
              {defaultAddress.addressType.split(" ")[0].toUpperCase()}
            </span>
          </div>

          <div>
            <Link
              to="/userProfile"
              className="badge text-bg-light border border-dark text-decoration-none"
              style={{ whiteSpace: "nowrap"}}
            >
              Change Default
            </Link>
          </div>
        </div>

        <div className="mt-2 text-muted small">
          {defaultAddress.address}, {defaultAddress.city},{" "}
          {defaultAddress.state}
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="container py-3 pb-5">
        <h2 className="text-center mb-4 fw-normal">
          My Cart {cart.length > 0 && `( ${cart.length} )`}
        </h2>
        <br />
        {cart.length === 0 ? (
          <div className="text-center text-secondary">
            <p className="fs-5 my-4">Oh no! Your cart is empty 🛒</p>
            <p className="fs-5 my-4">
              Looks like you haven't made your choice yet 💭
            </p>
            <Link className="btn btn-dark" to={"/wishlist"}>
              Browse Wishlist
            </Link>
          </div>
        ) : (
          <div className="row pageLoadAnimation">
            {/* Left section - Cart items */}
            <div className="col-lg-8 col-md-7">
              {/* Delivery Status */}
              <div className="card border p-3 mb-3 bg-body-tertiary rounded-4 ">
                {renderDefaultAddress(allAddressList)}
              </div>

              {cart.map((prod) => (
                <div
                  key={prod.id}
                  className="cart-item-card border rounded shadow-sm p-3 mb-3 bg-white"
                >
                  <div className="row align-items-center">
                    {/* Product Image */}
                    <div className="col-12 col-sm-3 text-center mb-3 mb-sm-0">
                      <Link to={`/products/productDetails/${prod.id}`}>
                        <img
                          src={prod.thumbnail}
                          alt={prod.title}
                          className="img-fluid rounded bg-light"
                          style={{ maxHeight: "120px", objectFit: "cover" }}
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="col-12 col-sm-5 text-center text-sm-start">
                      <Link
                        to={`/products/productDetails/${prod.id}`}
                        className="text-decoration-none text-dark"
                      >
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
                        <h5 className="product-total mt-3">
                          Total ${getEachProductTotal(prod)}
                        </h5>
                      </Link>
                    </div>

                    {/* Controls and Buttons */}
                    <div className="col-12 col-sm-4 text-center mt-3 mt-sm-0">
                      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                        <button
                          className="btn btn-qty btn-sm"
                          onClick={() =>
                            handleCartItemsQuantity(prod.id, "decrease")
                          }
                        >
                          -
                        </button>
                        <span className="badge bg-dark fs-6">
                          {prod.quantity}
                        </span>
                        <button
                          className="btn btn-qty btn-sm"
                          onClick={() =>
                            handleCartItemsQuantity(prod.id, "increase")
                          }
                        >
                          +
                        </button>
                        <button
                          className="btn btn-wishlist btn-sm"
                          onClick={() => moveToWishlist(prod)}
                        >
                          Wishlist
                        </button>
                        <button
                          className="btn btn-remove btn-sm"
                          onClick={() => removeFromCart(prod.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right section - Price summary */}
            <div className="col-lg-4 col-md-5">
              <PriceDetailsBox />
            </div>
          </div>
        )}

        <br /><br />
      </div>
    </main>
  );
}

export default function Cart() {
  return (
    <div style={{ backgroundColor: "#f7faff" }}>
      <Header />
      <CartMain />
      <Footer/>
    </div>
  );
}
