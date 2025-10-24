import { Link, useLocation } from "react-router-dom";
import shopWithConfidence from "../../assets/product-details/shopWithConfidence.svg";
import { useProductContext } from "../../contexts/ProductContext";


export default function PriceDetailsBox({handleOrderSuccessfull , isAddressSelected}) {
  const { cart } = useProductContext();

  const location = useLocation()
  const currentPath = location.pathname

  // Right section Price Details logic:
  // ---- ---- ---- ----

  function itemCounterLabel(cart) {
    return `MSRP (${cart.length} ${cart.length === 1 ? "Item" : "Items"})`;
  }

  function getMRPTotal(cart) {
    return cart
      .reduce((acc, curVal) => acc + curVal.price * curVal.quantity, 0)
      .toFixed(1);
  }

  function getTotalMoneySaved(cart) {
    return cart
      .reduce(
        (acc, curVal) =>
          acc +
          ((curVal.price * curVal.discountPercentage) / 100) * curVal.quantity,
        0
      )
      .toFixed(1);
  }

  function getDeliveryCharges(cart) {
    const total = (getMRPTotal(cart) - getTotalMoneySaved(cart)).toFixed(1);

    if (total >= 100) {
      return 0;
    } else {
      return 10;
    }
  }

  return (
    <div className="sticky-top-custom">
      <div className="price-box">
        <h6 className="mb-3 text-secondary">PRICE DETAILS</h6>
        <hr />
        <div className="d-flex justify-content-between mb-2">
          <span>{itemCounterLabel(cart)}</span>
          <span className="text-muted">${getMRPTotal(cart)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Discount</span>
          <span className="text-success fw-medium">
            -${getTotalMoneySaved(cart)}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Price</span>
          <span className="fw-medium">
            ${(getMRPTotal(cart) - getTotalMoneySaved(cart)).toFixed(1)}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Delivery </span>
          <span className="fw-medium">
            {getDeliveryCharges(cart) === 0
              ? "Free"
              : "$" + getDeliveryCharges(cart)}
          </span>
        </div>
        {getDeliveryCharges(cart) !== 0 && (
          <p className="text-success fw-medium">
            Free delivery on orders above $100
          </p>
        )}
        <hr />
        <div className="d-flex justify-content-between fw-semibold">
          <span className="fs-5 ">Total Amount</span>
          <span className="fs-5">
            $
            {(
              getMRPTotal(cart) -
              getTotalMoneySaved(cart) +
              getDeliveryCharges(cart)
            ).toFixed(1)}
          </span>
        </div>
        <hr />
        <p className="text-success mb-1 fw-medium">
          <i className="bi bi-coin"> You will save ${getTotalMoneySaved(cart)} on this order</i> 
        </p>
        
        {currentPath === "/cart" ? (
          <Link to={"/checkout"} className="btn btn-dark w-100 mt-4">
            Place Order
          </Link>
        ) : isAddressSelected && (
          <Link onClick={handleOrderSuccessfull} className="btn btn-dark w-100 mt-4">
            Continue
          </Link>
        )}

      </div>
      <div className="shop-confidence d-flex align-items-center justify-content-center">
        <img
          src={shopWithConfidence}
          alt="shopWithConfidence"
          height={30}
          className="me-2"
          style={{ filter: "grayscale(100%)" }}
        />
        <small className="text-secondary">
          Safe and Secure Payments.Easy returns.100% Authentic products.
        </small>
      </div>
    </div>
  );
}
