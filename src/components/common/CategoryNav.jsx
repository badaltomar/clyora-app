import { useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryNav.css";

function CategoryNav() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const categories = [
  {
    category: "Men's Fashion",
    slug: "mens",
    logo: "/icons/tshirt.png",
    subCategories: ["mens-shirts", "mens-shoes", "mens-watches"],
  },
  {
    category: "Women's Fashion",
    slug: "womens",
    logo: "/icons/dress.png",
    subCategories: [
      "tops",
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
  },
  {
    category: "Beauty & Care",
    slug: "beauty",
    logo: "/icons/beauty.png",
    subCategories: [
      { name: "beauty", logo: "/icons/beauty.png" },
      { name: "fragrances", logo: "/icons/perfume.png" },
      { name: "skin-care", logo: "/icons/skincare.png" },
      { name: "sunglasses", logo: "/icons/sunglasses.png" },
    ],
  },
];


  const handleDropdownToggle = (slug) => {
    setOpenDropdown(openDropdown === slug ? null : slug);
  };

  return (
    <nav className="mega-navbar shadow-sm">
      {/* Desktop / Laptop View */}
      <div className="d-none d-md-flex justify-content-center align-items-center gap-5 flex-wrap">
        {/* All products */}
        <Link
          to="/products"
          className="category-title text-decoration-none text-center"
        >
          <img src="/icons/all.png" alt="all" />
          <br />
          All
        </Link>

        {categories.map((cat, index) =>
          cat.slug === "beauty" ? (
            <div
              key={index}
              className="d-flex gap-4 align-items-center beauty-category"
            >
              {cat.subCategories.map((sub, idx) => (
                <Link
                  key={idx}
                  to={`/products/${sub.name}`}
                  className="category-title d-block text-capitalize text-decoration-none text-center"
                >
                  <img src={sub.logo} alt={sub.name} />
                  <br />
                  {sub.name.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          ) : (
            <div key={index} className="mega-dropdown text-center">
              <div className="mega-dropdown-trigger">
                <img src={cat.logo} alt={cat.slug} />
                <span className="category-title d-block text-capitalize">
                  {cat.category}
                </span>
              </div>

              <div className="mega-dropdown-content shadow-sm">
                <ul className="list-unstyled mb-0">
                  {cat.subCategories.map((sub, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/products/${sub}`}
                        className="text-decoration-none text-capitalize"
                      >
                        {sub.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </div>

      {/* Mobile / Tablet View */}
      <div className="d-md-none category-mobile px-1">
        <div className="scrollable-row d-flex align-items-center gap-3 py-2 px-2">
          <Link
            to="/products"
            className="category-pill text-decoration-none text-dark"
          >
            <img src="/icons/all.png" alt="All" />
            <span>All</span>
          </Link>

          {categories.map((cat) => (
            <div key={cat.slug} className="category-pill-wrapper">
              <button
                className="category-pill"
                onClick={() => handleDropdownToggle(cat.slug)}
              >
                <img src={cat.logo} alt={cat.slug} />
                <span>{cat.category}</span>
                <i
                  className={`bi ms-1 ${
                    openDropdown === cat.slug
                      ? "bi-chevron-up"
                      : "bi-chevron-down"
                  }`}
                ></i>
              </button>

              {openDropdown === cat.slug && (
                <div className="mobile-submenu bg-light shadow-sm rounded-4 mt-2">
                  {cat.subCategories.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={`/products/${
                        typeof sub === "string" ? sub : sub.name
                      }`}
                      className="d-block text-capitalize px-3 py-2 text-decoration-none text-dark border-bottom small"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {typeof sub === "string"
                        ? sub.replace(/-/g, " ")
                        : sub.name.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default CategoryNav;
