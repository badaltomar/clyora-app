import { useProductContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";

export default function WishlistMain() {
  const { wishlist, setWishlist, handleAddToCart } = useProductContext();

  function handleRemoveProduct(prod) {
    let updatedWishlist = wishlist.filter((item) => item.id !== prod.id);
    setWishlist(updatedWishlist); // State changed => automatically re-render
  }  

  function getDiscountedPrice(prod) {
    return (prod.price - (prod.price * prod.discountPercentage) / 100).toFixed(2);
  }

  return (
    <main className="container py-3 pb-5">
      <h2 className="text-center mb-4 fw-normal">
        My Wishlist {wishlist.length > 0 && `( ${wishlist.length} )`}
      </h2>
      <br />
      {wishlist.length === 0 ? (
        <div className="text-center text-secondary">
          <p className="fs-5 my-4">Ready to shop? 🛍️</p>
          <p className="fs-5 my-4">
            Your wishlist is empty, Let's fill it with amazing products! 🥳✨
          </p>
          <Link className="btn btn-dark" to={"/products"}>Explore</Link>
        </div>
      ) : (
        <div className="row pageLoadAnimation">
          {wishlist.map((prod, index) => (
            <div
              key={prod.id}
              className="col-12 mb-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="card wishlist-card shadow-sm border-0"
              >
                <div className="row g-0 align-items-center p-2">
                  {/* Product Image */}
                  <div className="col-12 col-sm-2 text-center mb-2 mb-sm-0">
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="img-fluid rounded bg-light"
                      style={{ maxHeight: "120px", objectFit: "cover" }}
                    />
                  </div>

                  {/* Product Info here */} 
                  <Link to={`/products/productDetails/${prod.id}`} className="col-12 col-sm-6 text-decoration-none text-dark">
                    <h6 className="text-muted mb-1">
                      {prod.brand || "No Brand Available"}
                    </h6>
                    <h5 className="fw-normal">{prod.title}</h5>
                    <div className="mt-2">
                      <span className="fw-semibold">
                        ${getDiscountedPrice(prod)}
                      </span>
                      <span className="mx-2 text-secondary text-decoration-line-through">
                        ${prod.price.toFixed(2)}
                      </span>
                      <span className="fw-semibold text-success">
                        {prod.discountPercentage.toFixed(1)}% Off
                      </span>
                    </div>

                    {/* Stock */}
                    <div className="mt-2">
                      {prod.stock === 0 ? (
                        <span className="stock-indicator stock-out">Out of Stock</span>
                      ) : prod.stock <= 50 ? (
                        <span className="stock-indicator stock-low">Low Stock</span>
                      ) : (
                        <span className="stock-indicator stock-in">In Stock</span>
                      )}
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div className="col-12 col-sm-4 text-center mt-2 mt-sm-0 d-flex justify-content-center align-items-center gap-3 flex-wrap">
                    <div
                      className="iconsPng mx-3 my-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveProduct(prod);
                      }}
                    >
                      <img src="/icons/delete.png" alt="delete" height={33} />
                    </div>

                    <div
                      className="iconsPng mx-3 my-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(prod);
                      }}
                    >
                      <img src="/icons/cart.png" alt="Add to cart" height={33} />
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <br /><br /><br />
    </main>
  );
}
