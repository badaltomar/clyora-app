import { useState } from "react";
import Header from "../components/common/Header";
import "../components/product/ProductListing.css";
import { BeatLoader } from "react-spinners";

import useFetch from "../useFetch";
import { Link, useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import Footer from "../components/common/Footer";
import { toast } from "react-toastify";

const ProductListMain = () => {
  const { wishlist, handleWishlistProducts, handleAddToCart, searchInput } =
    useProductContext();

  const { categoryType } = useParams();
  // console.log(categoryType);

  let apiUrl =
    categoryType !== undefined
      ? `https://dummyjson.com/products/category/${categoryType}`
      : "https://dummyjson.com/products?limit=0";

  const { data, loading, error } = useFetch(apiUrl);

  //---- ---- ----
  // Use States:
  //---- ---- ----

  const [priceRange, setPriceRange] = useState(100000000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(null);
  const [sorting, setSorting] = useState("");

  //---- ---- ----
  // Handle Filter Inputs onChange:
  //---- ---- ----

  const handlePriceRange = (e) => {
    const { value } = e.target;
    setPriceRange(Number(value)); // value: string to int.
  };

  const handleCategory = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, value]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== value)
      );
    }
  };

  const handleRating = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setRating(Number(value)); // value: string to int.
    } else {
      setRating(null);
    }
  };

  const handleSorting = (e) => {
    setSorting(e.target.id);
  };

  //---- ---- ----
  // Filtered Data Array:
  //---- ---- ----

  const filteredDataArray =
    data && data.products.length > 0
      ? data.products.filter((prod) => {
          const matchPriceRange = prod.price >= 0 && prod.price <= priceRange;

          const matchSelectedCategories =
            selectedCategories.length === 0 ||
            selectedCategories.includes(prod.category);

          const matchRating =
            rating === null || prod.rating.toFixed(1) >= rating;
          // Changing two decimal ratings into rounded and .OneDecimal: e.g. Rating: 3.97 => 4.0

          const matchSearch =
            prod.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            (prod.tags &&
              prod.tags
                .join(" ")
                .toLowerCase()
                .includes(searchInput.toLowerCase())) ||
            (prod.brand &&
              prod.brand.toLowerCase().includes(searchInput.toLowerCase()));

          return (
            matchRating &&
            matchPriceRange &&
            matchSelectedCategories &&
            matchSearch
          );
        })
      : [];

  //---- ---- ----
  // Sorting Filtered Data Array (By Price):
  //---- ---- ----

  if (sorting === "lowToHigh") {
    filteredDataArray.sort((a, b) => a.price - b.price);
  } else if (sorting === "highToLow") {
    filteredDataArray.sort((a, b) => b.price - a.price);
  }

  //---- ---- ----
  // Filter Reset: to default values:
  //---- ---- ----

  const handleFiltersReset = () => {
    toast("Filters Cleared")
    setPriceRange(100000000);
    setSelectedCategories([]);
    setRating(null);
    setSorting("");

    // if (categoryType !== undefined) {
    //     navigate("/products")   // if on any category page then navigate to all products page on click "Clear" filters btn.
    // } ***************************************
  };

  //---- ---- ----
  return (
    <main className="container-fluid ">
      <div className="row">
        {/* {Filters Side Bar} */}
        <div className="col-md-2 p-3 pt-4 bg-body-tertiary">
          {/* Toggle button visible only on mobile */}
          <div className="d-md-none mb-3 text-center">
            <button
              className="btn btn-outline-dark w-100"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#filterCollapse"
              aria-expanded="false"
              aria-controls="filterCollapse"
            >
              Filters
            </button>
          </div>

          {/* Collapsible filter section */}
          <div className="collapse d-md-block" id="filterCollapse">
            <form style={{ userSelect: "none" }}>
              <div className="d-flex justify-content-between">
                <h5>Filters</h5>
                <button
                  type="reset"
                  onClick={handleFiltersReset}
                  className="btn btn-sm btn-dark rounded-3"
                >
                  Clear
                </button>
              </div>
              <br />
              <h6>Price</h6>
              <label
                htmlFor="priceRange"
                className="d-flex justify-content-between text-muted"
              >
                <div>$50</div>
                <div>$200</div>
                <div>$350</div>
                <div>$500</div>
              </label>
              <input
                type="range"
                name="priceRange"
                id="priceRange"
                className="form-range"
                step={150}
                min={50}
                max={500}
                onChange={handlePriceRange}
              />
              <br />
              <br />
              {categoryType === undefined && (
                <>
                  <h6>Category</h6>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="beauty"
                      id="beauty"
                    />
                    <label className="form-check-label" htmlFor="beauty">
                      Beauty
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="fragrances"
                      id="fragrances"
                    />
                    <label className="form-check-label" htmlFor="fragrances">
                      Fragrances
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="mens-shirts"
                      id="mens-shirts"
                    />
                    <label className="form-check-label" htmlFor="mens-shirts">
                      Men's Shirts
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="mens-shoes"
                      id="mens-shoes"
                    />
                    <label className="form-check-label" htmlFor="mens-shoes">
                      Men's Shoes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="mens-watches"
                      id="mens-watches"
                    />
                    <label className="form-check-label" htmlFor="mens-watches">
                      Men's Watches
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="skin-care"
                      id="skincare"
                    />
                    <label className="form-check-label" htmlFor="skincare">
                      Skin Care
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="sunglasses"
                      id="sunglasses"
                    />
                    <label className="form-check-label" htmlFor="sunglasses">
                      Sunglasses
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="tops"
                      id="tops"
                    />
                    <label className="form-check-label" htmlFor="tops">
                      Women's Tops
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="womens-bags"
                      id="womens-bags"
                    />
                    <label className="form-check-label" htmlFor="womens-bags">
                      Women's Bags
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="womens-dresses"
                      id="womens-dresses"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="womens-dresses"
                    >
                      Women's Dresses
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="womens-jewellery"
                      id="womens-jewellery"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="womens-jewellery"
                    >
                      Women's Jewellery
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="womens-shoes"
                      id="womens-shoes"
                    />
                    <label className="form-check-label" htmlFor="womens-shoes">
                      Women's Shoes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCategory}
                      className="form-check-input"
                      type="checkbox"
                      value="womens-watches"
                      id="womens-watches"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="womens-watches"
                    >
                      Women's Watches
                    </label>
                  </div>
                  <br />
                </>
              )}

              <h6>Rating</h6>
              <div className="form-check">
                <input
                  onChange={handleRating}
                  className="form-check-input"
                  type="radio"
                  name="ratingsRadioBtn"
                  id="4plus"
                  value={4}
                />
                <label className="form-check-label" htmlFor="4plus">
                  4 Stars & above
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleRating}
                  className="form-check-input"
                  type="radio"
                  name="ratingsRadioBtn"
                  id="3plus"
                  value={3}
                />
                <label className="form-check-label" htmlFor="3plus">
                  3 Stars & above
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleRating}
                  className="form-check-input"
                  type="radio"
                  name="ratingsRadioBtn"
                  id="2plus"
                  value={2}
                />
                <label className="form-check-label" htmlFor="2plus">
                  2 Stars & above
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleRating}
                  className="form-check-input"
                  type="radio"
                  name="ratingsRadioBtn"
                  id="1plus"
                  value={1}
                />
                <label className="form-check-label" htmlFor="1plus">
                  1 Stars & above
                </label>
              </div>

              <br />

              <h6>Sort By</h6>
              <div className="form-check">
                <input
                  onChange={handleSorting}
                  className="form-check-input"
                  type="radio"
                  name="sortRadioBtns"
                  id="lowToHigh"
                />
                <label className="form-check-label" htmlFor="lowToHigh">
                  Price Low to High
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleSorting}
                  className="form-check-input"
                  type="radio"
                  name="sortRadioBtns"
                  id="highToLow"
                />
                <label className="form-check-label" htmlFor="highToLow">
                  Price High to Low
                </label>
              </div>
              <br />
            </form>
          </div>
        </div>

        {/* {Products Listing} */}

        <div className="col-md-10 p-4">
          {loading ? (
            <>
              <p
                className="text-center lead fw-normal text-dark alert alert-dark"
                role="alert"
              >
                Loading Products...
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
              Failed to fetch Products. Please try again later.
            </p>
          ) : filteredDataArray.length === 0 ? (
            <p className="text-center text-muted fs-5 mt-4">
              ❌ Category or Product not found!
            </p>
          ) : (
            filteredDataArray && (
              <>
                <div className="d-flex align-items-center">
                  {categoryType !== undefined ? (
                    <h4 className="me-3 mb-0 text-capitalize fw-normal">
                      {categoryType.replace(/-/, " ")}
                    </h4>
                  ) : (
                    <h4 className="me-3 mb-0 fw-normal">All Products</h4>
                  )}

                  <span className="text-muted fw-semibold">
                    {`(Showing ${filteredDataArray.length} products)`}{" "}
                  </span>
                </div>

                <div className="row">
                  {data &&
                    filteredDataArray.map((prod) => (
                      <div
                        key={prod.id}
                        className="col-md-3 col-6 col-sm-4 g-lg-5 g-3"
                      >
                        <Link
                          className="card text-center h-100 rounded-4 border-light position-relative text-decoration-none"
                          to={`/products/productDetails/${prod.id}`}
                        >
                          <img
                            height="150px"
                            src={prod.thumbnail}
                            alt={prod.id}
                            className="card-img img-fluid rounded-top-4 "
                            onError={(e) =>
                              (e.target.src = `https://placehold.co/600x400?text=${prod.brand}`)
                            }
                          />

                          {/* Floating Wishlist Button */}
                          <div className="wishlist-floating">
                            <button
                              className={`wishlist-glass ${
                                wishlist.some((item) => item.id === prod.id)
                                  ? "active"
                                  : ""
                              } `}
                              onClick={(e) => {
                                e.preventDefault(),
                                  handleWishlistProducts(prod);
                              }}
                            >
                              <i
                                className={`bi ${
                                  wishlist.some((item) => item.id === prod.id)
                                    ? "bi-heart-fill"
                                    : "bi-heart"
                                } `}
                                title={
                                  wishlist.some((item) => item.id === prod.id)
                                    ? "Remove from Wishlist"
                                    : "Add to Wishlist"
                                }
                              ></i>
                            </button>
                          </div>

                          <div className="card-body px-1">
                            <p className="card-title fw-semibold">
                              {prod.title}
                            </p>
                            <span className="fw-semibold">
                              $
                              {(
                                prod.price -
                                (prod.price * prod.discountPercentage) / 100
                              ).toFixed(1)}{" "}
                            </span>
                            <br />
                            <small className="mx-2 text-secondary text-decoration-line-through">
                              ${prod.price.toFixed(1)}{" "}
                            </small>
                            <small className="fw-semibold text-success">
                              {prod.discountPercentage.toFixed(1)} % off{" "}
                            </small>
                            <span
                              className={`position-absolute top-0 start-0 mt-2 ms-2 small fw-bold rounded-pill p-1
                                                    ${
                                                      prod.rating.toFixed(1) >=
                                                      4
                                                        ? "bg-success-subtle text-success border border-success" // green for excellent
                                                        : prod.rating.toFixed(
                                                            1
                                                          ) >= 3
                                                        ? "bg-warning-subtle text-warning border border-warning" // yellow for average
                                                        : "bg-danger-subtle text-danger border border-danger" // red for poor
                                                    }
                                                `}
                            >
                              {prod.rating.toFixed(1)}{" "}
                              <i className="bi bi-star-fill"></i>
                            </span>
                            {/* To display rounded numbers of rating.  */}
                          </div>

                          <button
                            className="btn btn-dark rounded-0 rounded-bottom-4"
                            onClick={(e) => {
                              e.preventDefault(), handleAddToCart(prod);
                            }}
                          >
                            Add to Cart
                          </button>
                        </Link>
                      </div>
                    ))}
                </div>
              </>
            )
          )}
          <br />
          <br />
          <br />
        </div>
      </div>
    </main>
  );
};

function ProductListing() {
  return (
    <div style={{ minHeight: "100vh" }} className="bg-body-secondary">
      <Header />
      <ProductListMain />
      <Footer />
    </div>
  );
}

export default ProductListing;
