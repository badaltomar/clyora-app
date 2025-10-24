import Header from "../components/common/Header";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import "../components/product/ProductDetails.css";

// svg:
import twentyFourSevenSupport from "../assets/product-details/247support.svg";
import expressDelivery from "../assets/product-details/expressDelivery.svg";
import pod from "../assets/product-details/pod.svg";
import returnAvailable from "../assets/product-details/return.svg";
import securePayment from "../assets/product-details/securePayment.svg";
import standardDelivery from "../assets/product-details/standardDelivery.svg";

function ProductDetailsMain() {
  const { wishlist, handleWishlistProducts, handleAddToCart } =
    useProductContext();
  const navigate = useNavigate();

  const prodId = useParams();
  const apiUrl = `https://dummyjson.com/products/${prodId.prodId}`; // Get single product by id.
  const { data, loading, error } = useFetch(apiUrl);

  const [selectedImage, setSelectedImage] = useState("");

  function handleBuyNow(prod) {
    handleAddToCart(prod);
    navigate("/checkout");
  }

  return (
    <main className="container py-4">
      {loading ? (
        <>
          <p
            className="text-center lead fw-normal text-dark alert alert-dark"
            role="alert"
          >
            Loading Product Details...
          </p>
          <br />
          <div className="d-flex justify-content-center">
            <BeatLoader
              color="#454545ff"
              loading={loading}
              size={15}
              speedMultiplier={2}
              aria-label="Loading Spinner"
            />
          </div>
        </>
      ) : error ? (
        <p className="text-center text-danger fw-semibold">
          Failed to fetch Product. Please try again later.
        </p>
      ) : data && !data.id ? (
        <p className="text-center text-muted fs-5 mt-4">
          ❌ There is no product available by this ID.
        </p>
      ) : (
        data && (
          <>
            <div className="row">
              {/* Product Card */}
              <div className="col-md-5">
                <div
                  className="row sticky-top"
                  style={{ zIndex: 500, height: "fit-content", top: 80 }}
                >
                  {/* All Images Vertically */}
                  <div className="col-md-3">
                    <div className="row">
                      {data.images.map((img, index) => (
                        <div
                          key={index}
                          className="col-4 col-sm-3 col-md-12 d-flex justify-content-center mb-2"
                        >
                          <img
                            src={img}
                            alt="productImage"
                            className={`img-thumbnail rounded-4 ${
                              selectedImage === img ||
                              (!selectedImage && index === 0)
                                ? "border-secondary border-2"
                                : ""
                            }`}
                            onClick={() => setSelectedImage(img)}
                            style={{ maxHeight: 150, cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Image */}
                  <div className="col-md-9">
                    <img
                      src={selectedImage || data.images[0]}
                      alt="productImage"
                      className="img-fluid rounded-1 bg-white"
                      style={{ maxHeight: 500 }}
                    />
                    <div className="row my-3">
                      <button
                        className="col mx-1 ms-3 border-1 border-secondary shadow-sm rounded-1 py-2 text-light"
                        disabled={data.stock === 0}
                        onClick={() => handleAddToCart(data)}
                        style={{ backgroundColor: "#00a3a3" }}
                      >
                        <i className="bi bi-cart3"></i> ADD TO CART
                      </button>
                      <button
                        className="col mx-1 me-3 border-1 border-secondary shadow-sm rounded-1 py-2 text-light"
                        disabled={data.stock === 0}
                        onClick={() => handleBuyNow(data)}
                        style={{ backgroundColor: "#ff6b6b" }}
                      >
                        <i className="bi bi-lightning-fill"></i> BUY NOW
                      </button>
                    </div>
                    {/* Floating Wishlist Button */}
                    <div className="wishlist-floating">
                      <button
                        className={`wishlist-glass ${
                          wishlist.some((item) => item.id === data.id)
                            ? "active"
                            : ""
                        } `}
                        onClick={(e) => {
                          e.preventDefault(), handleWishlistProducts(data);
                        }}
                      >
                        <i
                          className={`bi ${
                            wishlist.some((item) => item.id === data.id)
                              ? "bi-heart-fill"
                              : "bi-heart"
                          } `}
                          title={
                            wishlist.some((item) => item.id === data.id)
                              ? "Remove from Wishlist"
                              : "Add to Wishlist"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="col-md-7 px-4">
                {data.brand && <h5 className="text-secondary">{data.brand}</h5>}
                {data.title && <h5>{data.title} </h5>}
                <span className="fs-4 fw-semibold">
                  $
                  {(
                    data.price -
                    (data.price * data.discountPercentage) / 100
                  ).toFixed(1)}{" "}
                </span>
                <span className="mx-2 text-secondary text-decoration-line-through">
                  ${data.price.toFixed(1)}{" "}
                </span>
                <span className="fw-semibold text-success">
                  {data.discountPercentage.toFixed(1)} % off{" "}
                </span>
                <br />
                {data.stock <= 20 && data.stock >= 1 ? (
                  <p className="text-danger fw-semibold my-1">
                    Hurry, Only {data.stock} left!
                  </p>
                ) : data.stock <= 50 && data.stock > 20 ? (
                  <p className="text-danger fw-semibold my-1">Only few left</p>
                ) : (
                  ""
                )}

                <br />
                <div className="d-flex align-items-center">
                  <span
                    className={`text-light px-2 rounded-pill fw-semibold ${
                      data.rating.toFixed(1) >= 4
                        ? "bg-success" // green for excellent
                        : data.rating >= 3
                        ? "bg-warning" // yellow for average
                        : "bg-danger" // red for poor
                    }`}
                  >
                    {data.rating.toFixed(1)} <i className="bi bi-star-fill"></i>
                  </span>
                  <span className="text-secondary fw-semibold mx-2">
                    {data.reviews.length} Ratings & reviews{" "}
                  </span>
                </div>

                {data.stock === 0 && (
                  <>
                    <br />
                    <h3 className="text-success">Currently Unavailable</h3>
                    <h5 className="text-secondary pb-4">
                      We don't know when or if this item will be back in stock.
                    </h5>
                  </>
                )}

                <hr />
                <div className="d-flex flex-wrap justify-content-start gap-4 mt-4">
                  {[
                    {
                      img: [
                        "Ships in 1-2 business days",
                        "Ships in 3-5 business days",
                        "Ships overnight",
                      ].includes(data.shippingInformation)
                        ? expressDelivery
                        : standardDelivery,
                      label: data.shippingInformation,
                    },
                    {
                      img: returnAvailable,
                      label: data.returnPolicy,
                      grayscale: data.returnPolicy === "No return policy",
                    },
                    { img: pod, label: "Pay on Delivery" },
                    { img: twentyFourSevenSupport, label: "24/7 Support" },
                    { img: securePayment, label: "Secure Transaction" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column align-items-center flex-grow-1"
                      style={{
                        minWidth: "90px",
                        maxWidth: "120px",
                        textAlign: "center",
                        marginBottom: "1rem", 
                      }}
                    >
                      <img
                        src={item.img}
                        alt=""
                        height={50}
                        style={
                          item.grayscale ? { filter: "grayscale(100%)" } : {}
                        }
                      />
                      <span
                        className="mt-2 d-block"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Description */}
                <h5 className="my-3">Product Details:</h5>
                <div className=" rounded-4 p-3 mb-3 bg-white border border-primary-subtle">
                  <p>{data.description}</p>

                  <div className="row mb-2">
                    <div className="col-4 col-md-3 text-secondary">Brand</div>
                    <div className="col-8 col-md-9">
                      {data.brand || "Not Available"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4 col-md-3 text-secondary">
                      Category
                    </div>
                    <div className="col-8 col-md-9 text-capitalize">
                      {data.category || "Not Available"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4 col-md-3 text-secondary">
                      Dimensions
                    </div>
                    <div className="col-8 col-md-9">
                      {data.dimensions
                        ? `${data.dimensions.depth}L x ${data.dimensions.width}W x ${data.dimensions.height}H Centimeters`
                        : "Not Available"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4 col-md-3 text-secondary">Tags</div>
                    <div className="col-8 col-md-9 text-capitalize">
                      {data.tags ? data.tags.join(", ") : "Not Available"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4 col-md-3 text-secondary">Weight</div>
                    <div className="col-8 col-md-9 text-capitalize">
                      {data.weight || "Not Available"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4 col-md-3 text-secondary">
                      Warranty
                    </div>
                    <div className="col-8 col-md-9 text-capitalize">
                      {data.warrantyInformation || "Not Available"}
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <hr className="my-4" />
                <section className="reviews-section mt-4">
                  <h5 className="mb-3 fw-semibold">Customer Reviews</h5>

                  {data.reviews && data.reviews.length > 0 ? (
                    <div className="reviews-list">
                      {data.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="review-card border border-success-subtle rounded-4 p-3 mb-3 bg-light-subtle"
                        >
                          <div className="d-flex justify-content-between flex-wrap align-items-start">
                            <div>
                              <h6 className="mb-0 fw-semibold text-dark d-flex align-items-center">
                                {review.reviewerName}
                                <i
                                  className="bi bi-check-circle-fill text-success ms-2"
                                  style={{ fontSize: "0.9rem" }}
                                  title="Verified Buyer"
                                ></i>
                              </h6>
                              <small className="text-muted d-block">
                                {review.reviewerEmail}
                              </small>
                              <small className="text-secondary">
                                {new Date(review.date).toLocaleDateString()}
                              </small>
                            </div>

                            {/* Rating stars */}
                            <div className="rating-stars mt-2 mt-md-0">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`bi bi-star-fill ${
                                    i < review.rating
                                      ? "text-warning"
                                      : "text-secondary"
                                  }`}
                                  style={{ fontSize: "1rem" }}
                                ></i>
                              ))}
                            </div>
                          </div>

                          <hr className="my-2" />

                          <p className="text-dark mb-1 lh-sm fs-6">
                            {review.comment}
                          </p>
                          <small className="text-success fw-semibold">
                            Verified Buyer
                          </small>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted fs-6">
                      No reviews available for this product yet.
                    </p>
                  )}
                </section>
              </div>
            </div>
            
            {/* Similar Items */}

            
          </>
        )
      )}
    </main>
  );
}

function ProductDetails() {
  return (
    <div style={{ backgroundColor: "#f7faff", minHeight: "100vh" }}>
      <Header />
      <ProductDetailsMain />
    </div>
  );
}

export default ProductDetails;
