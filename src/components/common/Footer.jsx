import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section pageLoadAnimation">
      <div className="container py-5">
        <div className="row gy-4">
          {/* Brand and About */}
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-normal mb-3 text-dark">Clyora</h4>
            <p className="text-muted small">
              Discover the latest trends in fashion and style with Clyora. 
              We bring you quality, comfort, and design at the best prices. 
              Your satisfaction is our top priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold text-dark mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">All Products</Link></li>
              <li><Link to="/wishlist" className="footer-link">Wishlist</Link></li>
              <li><Link to="/cart" className="footer-link">Cart</Link></li>
              <li><Link to="/userProfile" className="footer-link">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-semibold text-dark mb-3">Customer Support</h6>
            <ul className="list-unstyled small">
              <li><i className="bi bi-envelope-fill me-2"></i> support@clyora.com</li>
              <li><i className="bi bi-telephone-fill me-2"></i> +91 7310925207</li>
              <li><i className="bi bi-geo-alt-fill me-2"></i> New Delhi, India</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-lg-3 col-md-6 text-center text-md-start">
            <h6 className="fw-semibold text-dark mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="https://www.facebook.com/" target="_blank" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/" target="_blank" className="social-icon"><i className="bi bi-instagram"></i></a>
              <a href="https://x.com/" target="_blank" className="social-icon"><i className="bi bi-twitter-x"></i></a>
              <a href="https://www.linkedin.com/" target="_blank" className="social-icon"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom py-3 mt-4 text-center text-muted small">
        © {new Date().getFullYear()} Clyora Clothing. All rights reserved.
      </div>
    </footer>
  );
}
