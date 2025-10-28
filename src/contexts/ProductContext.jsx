import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

const BASE_URL = "https://clyora-app-backend.vercel.app";

export function ProductProvider({ children }) {
  const initialDemoAddress = {
    name: "Badal Tomar",
    phone: 7310925207,
    pincode: 110091,
    city: "New Delhi",
    state: "Delhi",
    address: "Flat No. 502, Silver Oaks Apartments, Sector 12, Dwarka",
    addressType: "Home (All day delivery)",
  };

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [allAddressList, setAllAddressList] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/wishlist`)
      .then((res) => res.json())
      .then((data) => setWishlist(data))
      .catch((err) => console.error("Error fetching wishlist:", err));

    fetch(`${BASE_URL}/cart`)
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((error) => console.log("Error fetching cart:", error));

    fetch(`${BASE_URL}/address`)
      .then((res) => res.json())
      .then((data) => setAllAddressList(data))
      .catch((err) => console.error("Error fetching address:", err));
  }, []);

  // On first load
  useEffect(() => {
    async function addDemo() {
      const res = await fetch(`${BASE_URL}/address`);
      const data = await res.json();
      if (data.length === 0) {
        await fetch(`${BASE_URL}/address`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(initialDemoAddress),
        });
      }
    }
    addDemo();
  }, []);

  async function handleWishlistProducts(prod) {
    try {
      // Check if already exist:
      const exists = wishlist.find((item) => item.id === prod.id);

      if (exists) {
        // Remove from the wishlist / DB:
        toast.info("Removed from Wishlist❤️")
        await fetch(`${BASE_URL}/wishlist/${prod.id}`, { method: "DELETE" });
        setWishlist((prev) => prev.filter((item) => item.id !== prod.id));

        return;
      }
      // Add to wishlist / DB:
      toast.success("Added to Wishlist❤️")
      const res = await fetch(`${BASE_URL}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prod),
      });
      const data = await res.json();
      setWishlist((prev) => [...prev, data.newProduct]);
    } catch (error) {
      toast.error("Error updating wishlist")
      console.log("Error updating wishlist:", error);
    }
  }

  async function handleAddToCart(prod) {
    const added = cart.find((item) => item.id === prod.id);

    if (added) {
      toast.info("Product already added ✅, Checkout your cart! 🛒✨");
      return;
    }
    
    toast.success("Added to Cart 🛒")
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prod),
    });
    const data = await res.json();
    setCart((prev) => [...prev, data.newProduct]);

    const addedIntoWishlist = wishlist.find((item) => item.id === prod.id);
    if (addedIntoWishlist) {
      // Remove from wishlist / DB:
      toast.info("Removed from Wishlist❤️")
      await fetch(`${BASE_URL}/wishlist/${prod.id}`, { method: "DELETE" });
      setWishlist((prev) => prev.filter((itm) => itm.id !== prod.id));
    }
  }

  function getDiscountedPrice(prod) {
    return (prod.price - (prod.price * prod.discountPercentage) / 100).toFixed(
      1
    );
  }

  function getEachProductTotal(prod) {
    return (prod.quantity * Number(getDiscountedPrice(prod))).toFixed(1);
  }

  // Add or Update address:
  async function handleSaveAddress(addressData, editId = null) {
    try {
      if (editId) {
        // Update existing address
        toast("Address updated successfully 📍");
        const res = await fetch(`${BASE_URL}/address/${editId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addressData),
        });

        if (!res.ok) {
          const data = await res.json();
          console.log(data.message || "Failed to update address");
        }


        setAllAddressList((prev) =>
          prev.map((adrs) =>
            adrs._id === editId ? { ...adrs, ...addressData } : adrs
          )
        );
        return true; // indicate success
      } else {
        // Add new address
        toast("New Address saved successfully ✅");
        const res = await fetch(`${BASE_URL}/address`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addressData),
        });

        if (res.status === 409) {
          // Duplicate address
          const data = await res.json();
          toast.error("Address already exist, Change area or street 📍");
          throw new Error(data.message);
        }

        const data = await res.json();
        setAllAddressList((prev) => [...prev, data.newAddress]);

        return true;
      }
    } catch (error) {
      console.error("Error saving address:", error.message);
      return false; // indicate failure
    }
  }

  // Delete address
  async function handleDeleteAddress(id) {
    try {
      toast.info("Address deleted Successfully 🗑️")
      await fetch(`${BASE_URL}/address/${id}`, { method: "DELETE" });
      setAllAddressList((prevList) =>
        prevList.filter((adrs) => adrs._id !== id)
      );
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        searchInput,
        setSearchInput,
        wishlist,
        setWishlist,
        handleWishlistProducts,
        cart,
        setCart,
        handleAddToCart,
        getDiscountedPrice,
        getEachProductTotal,
        allAddressList,
        setAllAddressList,
        handleSaveAddress,
        handleDeleteAddress,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
