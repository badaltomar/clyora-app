import { Link } from "react-router-dom";
import useFetch from "../../useFetch";
import CategoryNav from "./CategoryNav";
import { BeatLoader } from "react-spinners";
import { useProductContext } from "../../contexts/ProductContext";

const HomeMain = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

  const apiUrlAllProducts = "https://dummyjson.com/products";
  const { data, loading, error } = useFetch(apiUrlAllProducts);

  const {handleAddToCart } = useProductContext();

  const products = data?.products || [];

  const shuffleArray = (arr) => {
    return arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  // Shuffle products for New Arrivals
  const shuffledProducts = shuffleArray(products);
  const newArrivals = shuffledProducts.slice(0, 8);

  // Shuffle remaining products for Featured Products
  const remainingProducts = shuffledProducts.slice(8);
  const featuredProducts = shuffleArray(remainingProducts).slice(0, 8);

  return (
    <main className="container py-3">
      <CategoryNav />
      <div className="pageLoadAnimation">
        <br />

        {/* Carousel */}
        <div
          id="carouselExampleAutoplaying"
          className="carousel carousel-dark slide pb-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner custom-carousel">
            <div className="carousel-item">
              <img
                src="/carousel/slide1.png"
                className="d-block w-100"
                alt="Slide 1"
              />
            </div>
            <div className="carousel-item active">
              <img
                src="/carousel/slide2.png"
                className="d-block w-100"
                alt="Slide 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/carousel/slide3.png"
                className="d-block w-100"
                alt="Slide 3"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/carousel/slide4.png"
                className="d-block w-100"
                alt="Slide 4"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <br />
        {/* Products Section */}
        {loading ? (
          <div className="text-center py-5">
            <BeatLoader color="#444" loading={loading} size={12} />
            <p className="mt-3 text-muted fs-5">Loading products...</p>
          </div>
        ) : error ? (
          <p className="text-danger text-center">Failed to load products.</p>
        ) : (
          <>
            {/* New Arrivals */}
            <section className="my-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-semibold mb-0">New Arrivals</h4>
                <Link
                  to="/products"
                  className="text-decoration-none small text-dark fw-semibold"
                >
                  View All →
                </Link>
              </div>

              <div className="row g-4">
                {newArrivals.map((prod) => (
                  <div className="col-6 col-md-4 col-lg-3" key={prod.id}>
                    <div className="card product-card border-0 rounded-4 shadow-sm h-100">
                      <img
                        src={prod.thumbnail}
                        alt={prod.title}
                        className="card-img-top p-3 rounded-4"
                        style={{ height: "220px", objectFit: "contain" }}
                      />
                      <div className="card-body text-center">
                        <h6 className="fw-semibold text-truncate">
                          {prod.title}
                        </h6>
                        <p className="text-muted small mb-1 fw-semibold">
                          {prod.brand || "No Brand"}
                        </p>
                        <p className="fw-bold mb-2">
                          $
                          {(
                            prod.price -
                            (prod.price * prod.discountPercentage) / 100
                          ).toFixed(1)}
                        </p>
                        <Link
                          to={`/products/productDetails/${prod.id}`}
                          className="btn btn-dark btn-sm rounded-3 w-100"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section className="my-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-semibold mb-0">Featured Products</h4>
                <Link
                  to="/products"
                  className="text-decoration-none small text-dark fw-semibold"
                >
                  View All →
                </Link>
              </div>

              <div className="row g-4">
                {featuredProducts.map((prod) => (
                  <div className="col-6 col-md-4 col-lg-3" key={prod.id}>
                    <div className="card product-card border-0 rounded-4 shadow-sm h-100">
                      <img
                        src={prod.thumbnail}
                        alt={prod.title}
                        className="card-img-top p-3 rounded-4"
                        style={{ height: "220px", objectFit: "contain" }}
                      />
                      <div className="card-body text-center">
                        <h6 className="fw-semibold text-truncate">
                          {prod.title}
                        </h6>
                        <p className="text-muted small mb-1 fw-semibold">
                          {prod.brand || "No Brand"}
                        </p>

                        {/* Star Ratings */}
                        <div className="text-warning mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`bi ${
                                i < Math.round(prod.rating)
                                  ? "bi-star-fill"
                                  : "bi-star"
                              }`}
                            ></i>
                          ))}
                        </div>

                        <p className="fw-bold mb-2">
                          $
                          {(
                            prod.price -
                            (prod.price * prod.discountPercentage) / 100
                          ).toFixed(1)}
                        </p>
                        <Link
                          className="btn btn-outline-dark btn-sm rounded-3 w-100"
                          onClick={() => handleAddToCart(prod)}
                        >
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      
    </main>
  );
};

export default HomeMain;
