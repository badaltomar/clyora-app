import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {

  const initialDemoAddress = {
  name: "Badal Tomar",
  phone: 7310925207,
  pincode: 110091,
  city: "New Delhi",
  state: "Delhi",
  address: "Flat No. 502, Silver Oaks Apartments, Sector 12, Dwarka",
  addressType: "Home (All day delivery)",
  isDefault: true
}

  const [wishlist, setWishlist] = useLocalStorage("Wishlist", []);
  const [cart, setCart] = useLocalStorage("Cart", [])
  const [allAddressList, setAllAddressList] = useLocalStorage("AllAddressList" ,[initialDemoAddress])

  const [searchInput, setSearchInput] = useState("")


  function handleWishlistProducts(prod) {
    let updatedWishlist = [...wishlist];

    // Check if already exist:
    const exists = updatedWishlist.find((item) => item.id === prod.id);

    if (exists) {
      // Remove from the wishlist / local storage:
      updatedWishlist = updatedWishlist.filter((item) => item.id !== prod.id);
    } else {
      // Add to wishlist / localStorage:
      updatedWishlist.push(prod);
    }

    setWishlist(updatedWishlist);
  }

  function handleAddToCart(prod) {
    let updatedCart = [...cart];
    const added = updatedCart.find((item) => item.id === prod.id);

    if (added) {
      alert("Product already added ✅, Checkout your cart! 🛒✨")
    } else {
      updatedCart.push({...prod, quantity: 1})
      setWishlist(prevItems => prevItems.filter(itm => itm.id !== prod.id))
    }

    setCart(updatedCart);
  }


  return (
    <ProductContext.Provider
      value={{searchInput, setSearchInput, wishlist, setWishlist, handleWishlistProducts, cart, setCart, handleAddToCart, allAddressList, setAllAddressList }}
    >
      {children}
    </ProductContext.Provider>
  );
}
