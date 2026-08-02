import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <header
      className={`bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md text-primary sticky top-0 border-b border-outline-variant/30 z-50 transition-all ${
        isScrolled ? "shadow-sm py-1" : ""
      }`}
    >
      <nav className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
        >
          <span className="font-brand-script text-3xl md:text-4xl text-on-surface capitalize tracking-normal">
            Karisme
          </span>
          {/* <span className="material-symbols-outlined text-secondary text-xl select-none" title="Karisme">
            local_florist
          </span> */}
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/catalog?cat=mujer"
            className={`font-label-sm text-label-sm uppercase tracking-widest transition-colors duration-300 pb-1 ${
              location.pathname === "/catalog" &&
              (!location.search || location.search.includes("mujer"))
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Mujer
          </Link>
          <Link
            to="/catalog-men"
            className={`font-label-sm text-label-sm uppercase tracking-widest transition-colors duration-300 pb-1 ${
              location.pathname === "/catalog-men"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Hombre
          </Link>
          <Link
            to="/catalog-kids"
            className={`font-label-sm text-label-sm uppercase tracking-widest transition-colors duration-300 pb-1 ${
              location.pathname === "/catalog-kids"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Niños
          </Link>
        </div>

        {/* Trailing Icons */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="scale-95 active:opacity-80 transition-transform hover:text-primary cursor-pointer"
            aria-label="Buscar"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <Link
            to="/profile"
            className="scale-95 active:opacity-80 transition-transform hover:text-primary"
            title="Mi Perfil"
            aria-label="Perfil"
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
          <Link
            to="/admin"
            className="scale-95 active:opacity-80 transition-transform hover:text-primary"
            title="Panel de Administración"
            aria-label="Admin"
          >
            <span className="material-symbols-outlined">
              admin_panel_settings
            </span>
          </Link>
          <Link
            to="/cart"
            className="scale-95 active:opacity-80 transition-transform hover:text-primary relative"
            aria-label="Carrito"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="absolute -top-1.5 -right-2 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
              {totalItems}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden cursor-pointer hover:text-primary"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Search Overlay Drawer */}
      {isSearchOpen && (
        <div className="bg-surface-bright border-b border-outline-variant/30 px-margin-desktop py-4 animate-fade-in">
          <div className="max-w-container-max mx-auto flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar lencería, pijamas, colores, tallas..."
              className="w-full bg-transparent border-none text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-on-surface-variant hover:text-primary text-sm uppercase tracking-wider font-label-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-bright border-b border-outline-variant/30 px-margin-desktop py-6 flex flex-col gap-4 animate-fade-in">
          <Link
            to="/catalog"
            className="font-label-sm text-body-md uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary"
          >
            Mujer
          </Link>
          <Link
            to="/catalog-men"
            className="font-label-sm text-body-md uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary"
          >
            Hombre
          </Link>
          <Link
            to="/catalog-kids"
            className="font-label-sm text-body-md uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary"
          >
            Niños
          </Link>
          <Link
            to="/cart"
            className="font-label-sm text-body-md uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary flex items-center justify-between"
          >
            Bolsa de Compras{" "}
            <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {totalItems}
            </span>
          </Link>
          <Link
            to="/profile"
            className="font-label-sm text-body-md uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">person</span> Mi
            Perfil
          </Link>
          <Link
            to="/login"
            className="font-label-sm text-body-md uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">login</span>{" "}
            Iniciar Sesión
          </Link>
          <Link
            to="/admin"
            className="font-label-sm text-body-md uppercase tracking-wider py-2 text-primary font-bold flex items-center gap-2"
          >
            <span className="material-symbols-outlined">
              admin_panel_settings
            </span>{" "}
            Dashboard Admin
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
