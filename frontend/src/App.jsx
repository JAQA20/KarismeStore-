import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

// Layouts
import StoreLayout from "./layouts/StoreLayout";
import AdminLayout from "./layouts/AdminLayout";

// Lazy-loaded Pages for Route Code Splitting
const Home = lazy(() => import("./pages/store/Home"));
const Catalog = lazy(() => import("./pages/store/Catalog"));
const CatalogMen = lazy(() => import("./pages/store/CatalogMen"));
const CatalogKids = lazy(() => import("./pages/store/CatalogKids"));
const ProductDetail = lazy(() => import("./pages/store/ProductDetail"));
const Cart = lazy(() => import("./pages/store/Cart"));
const Login = lazy(() => import("./pages/store/Login"));
const SignUp = lazy(() => import("./pages/store/SignUp"));
const Profile = lazy(() => import("./pages/store/Profile"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Orders = lazy(() => import("./pages/admin/Orders"));
const Inventory = lazy(() => import("./pages/admin/Inventory"));
const InventoryCopy = lazy(() => import("./pages/admin/Inventory-copy"));
const Cms = lazy(() => import("./pages/admin/Cms"));

// Loading Fallback Spinner Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 py-24">
    <div className="w-10 h-10 border-4 border-outline-variant/30 border-t-primary rounded-full animate-spin"></div>
    <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant/60 animate-pulse">
      Cargando Karisme...
    </span>
  </div>
);

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Store Routes */}
              <Route path="/" element={<StoreLayout />}>
                <Route index element={<Home />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="catalog-woman" element={<Catalog />} />
                <Route path="catalog-women" element={<Catalog />} />
                <Route path="catalog-men" element={<CatalogMen />} />
                <Route path="catalog-kids" element={<CatalogKids />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Auth Routes (Standalone Canvas) */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="inventory" element={<Inventory />} />

                <Route path="inventory-copy" element={<InventoryCopy />} />
                <Route path="cms" element={<Cms />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
