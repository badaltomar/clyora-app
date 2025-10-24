import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import "../components/wishlist/Wishlist.css";
import WishlistMain from "../components/wishlist/WishlistMain";


export default function Wishlist() {
  return (
    <div style={{ backgroundColor: "#f7faff", minHeight: "100vh"}}>
      <Header />
      <WishlistMain />
      <Footer/>
    </div>
  );
}
