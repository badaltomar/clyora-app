import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProductContext } from "../../contexts/ProductContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useRef } from "react";

function Header() {

  const {wishlist, cart, searchInput, setSearchInput} = useProductContext() // For wishlist count.

  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const isProducts = location.pathname === "/products";

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    !isProducts && e.key === "Enter"
      ? navigate("/products")
      : searchInput;
  };

  useEffect(() => {
    if (location.pathname !== "/products") {
      setSearchInput("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/products" && searchRef.current) {
      searchRef.current.focus();
    }
  }, [location.pathname]);


  return (
    <header className="sticky-top">
      <nav
        className="navbar shadow-sm navbar-light"
        style={{ backgroundColor: "#e6f0fa" }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler fs-6"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <Link className="navbar-brand fs-4 fw-semibold ms-3 me-0" to="/">
              <img src="/clyoraLogo.svg" alt="logo" height={35} className="" />
            </Link>
          </div>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            style={{ maxWidth: "350px" }}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title fw-normal" id="offcanvasNavbarLabel">
                Clyora Clothing
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userProfile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">
                    Wishlist
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    to="/cart"
                  >
                    Cart
                  </Link>
                  
                </li>
              </ul>
            </div>
          </div>
          {/* Search Bar */}

          <input
            ref={searchRef}
            className="d-none d-md-flex flex-grow-1 form-control rounded-pill border border-2 border-dark"
            type="search"
            placeholder="Search products by brand, title, tags..."
            aria-label="Search"
            style={{ maxWidth: "340px" }}
            onChange={handleSearch}
            value={searchInput}
            onKeyDown={handleKeyDown}
          />

          {/* Icons */}
          <div className="d-flex align-items-center">
            <i
              className="bi bi-search fs-4 me-3 d-md-none"
              style={{ cursor: "pointer" }}
              title="Search"
              data-bs-toggle="collapse"
              data-bs-target="#mobileSearchBar"
            ></i>
            <Link className="text-dark" to={"/userProfile"}>
              <i className="bi bi-person-circle fs-4 mx-3" title="Profile"></i>
            </Link>
            <Link className="text-dark position-relative" to={"/wishlist"}>
              <i
                className={` ${
                  wishlist.length > 0
                    ? "bi bi-heart-fill fs-4 mx-3 text-dark"
                    : "bi bi-heart fs-4 mx-3"
                }  `}
                title="Wishlist"
              ></i>
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fw-light">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link className="text-dark position-relative me-1" to={"/cart"}>
              <i className={` ${
                  cart.length > 0
                    ? "bi bi-cart-fill fs-4 mx-3 text-dark"
                    : "bi bi-cart fs-4 mx-3"
                }  `} title="Cart"></i>
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fw-light">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Version: */}
      <div className="collapse bg-light px-3 py-2" id="mobileSearchBar">
        <input
          className="d-flex d-md-flex flex-grow-1 form-control rounded-pill border border-2 border-dark"
          type="search"
          placeholder="Search products by brand, title, tags..."
          aria-label="Search"
          onChange={handleSearch}
          value={searchInput}
          onKeyDown={handleKeyDown}
        />
      </div>
    </header>
  );
}

export default Header;
