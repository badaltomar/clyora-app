import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import ProductListing from './pages/ProductListing.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Checkout from './pages/Checkout.jsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { ProductProvider } from './contexts/ProductContext.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/products",
    element: <ProductListing/>
  },
  {
    path: "/products/:categoryType",
    element: <ProductListing/>
  },
  {
    path: "/products/productDetails/:prodId",
    element: <ProductDetails/>
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "/userProfile",
    element: <UserProfile/>
  },
  {
    path: "/wishlist",
    element: <Wishlist/>
  },
  {
    path: "/checkout",
    element: <Checkout/>
  }
])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </StrictMode>,
)
