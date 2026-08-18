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
      <nav className="flex justify-between items-center w-full px-[3%] py-[1.2%] max-w-none 2xl:max-w-[1920px] mx-auto">
        {/* Brand Logo - Fluid Font Sizing with Viewport Percentages */}
        <Link
          to="/"
          className="font-brand-script text-[clamp(1.75rem,2.4vw,3.25rem)] text-on-surface hover:opacity-80 transition-opacity capitalize tracking-normal leading-none"
        >
          Karisme
        </Link>

        {/* Navigation Links - Fluid Font Sizing with Viewport Percentages */}
        <div className="hidden md:flex gap-[2vw] items-center">
          <Link
            to="/catalog-woman"
            className={`font-label-sm text-[clamp(0.75rem,0.95vw,1.25rem)] uppercase tracking-widest transition-colors duration-300 pb-1 ${
              location.pathname === "/catalog-woman" || location.pathname === "/catalog" || location.pathname === "/catalog-women"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Mujer
          </Link>
          <Link
            to="/catalog-men"
            className={`font-label-sm text-[clamp(0.75rem,0.95vw,1.25rem)] uppercase tracking-widest transition-colors duration-300 pb-1 ${
              location.pathname === "/catalog-men"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Hombre
          </Link>
          <Link
            to="/catalog-kids"
            className={`font-label-sm text-[clamp(0.75rem,0.95vw,1.25rem)] uppercase tracking-widest transition-colors duration-300 pb-1 ${
              location.pathname === "/catalog-kids"
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Niños
          </Link>
        </div>

        {/* Trailing Icons - Fluid Font Sizing */}
        <div className="flex items-center gap-[1.5vw]">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="scale-95 active:opacity-80 transition-transform hover:text-primary cursor-pointer flex items-center"
            aria-label="Buscar"
          >
            <span className="material-symbols-outlined text-[clamp(1.2rem,1.4vw,2rem)]">search</span>
          </button>
          <Link
            to="/profile"
            className="scale-95 active:opacity-80 transition-transform hover:text-primary flex items-center"
            title="Mi Perfil"
            aria-label="Perfil"
          >
            <span className="material-symbols-outlined text-[clamp(1.2rem,1.4vw,2rem)]">person</span>
          </Link>
          <Link
            to="/admin"
            className="scale-95 active:opacity-80 transition-transform hover:text-primary flex items-center"
            title="Panel de Administración"
            aria-label="Admin"
          >
            <span className="material-symbols-outlined text-[clamp(1.2rem,1.4vw,2rem)]">
              admin_panel_settings
            </span>
          </Link>
          <Link
            to="/cart"
            className="scale-95 active:opacity-80 transition-transform hover:text-primary relative flex items-center"
            aria-label="Carrito"
          >
            <span className="material-symbols-outlined text-[clamp(1.2rem,1.4vw,2rem)]">shopping_bag</span>
            <span className="absolute -top-1.5 -right-2 bg-secondary text-white text-[clamp(0.55rem,0.65vw,0.85rem)] px-1.5 py-0.5 rounded-full flex items-center justify-center font-bold shadow-xs">
              {totalItems}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden cursor-pointer hover:text-primary flex items-center"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Search Overlay Drawer */}
      {isSearchOpen && (
        <div className="bg-surface-bright border-b border-outline-variant/30 px-[3%] py-4 animate-fade-in">
          <div className="w-full flex items-center gap-4">
            <span className="material-symbols-outlined text-primary text-[clamp(1.2rem,1.4vw,2rem)]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar lencería, pijamas, colores, tallas..."
              className="w-full bg-transparent border-none text-[clamp(0.9rem,1.1vw,1.35rem)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-on-surface-variant hover:text-primary text-[clamp(0.75rem,0.9vw,1.1rem)] uppercase tracking-wider font-label-sm font-bold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-bright border-b border-outline-variant/30 px-6 py-6 flex flex-col gap-4 animate-fade-in">
          <Link
            to="/catalog-woman"
            className="font-label-sm text-base uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary"
          >
            Mujer
          </Link>
          <Link
            to="/catalog-men"
            className="font-label-sm text-base uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary"
          >
            Hombre
          </Link>
          <Link
            to="/catalog-kids"
            className="font-label-sm text-base uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary"
          >
            Niños
          </Link>
          <Link
            to="/cart"
            className="font-label-sm text-base uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary flex items-center justify-between"
          >
            Bolsa de Compras{" "}
            <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {totalItems}
            </span>
          </Link>
          <Link
            to="/profile"
            className="font-label-sm text-base uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">person</span> Mi
            Perfil
          </Link>
          <Link
            to="/login"
            className="font-label-sm text-base uppercase tracking-wider py-2 border-b border-outline-variant/20 text-on-surface hover:text-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">login</span>{" "}
            Iniciar Sesión
          </Link>
          <Link
            to="/admin"
            className="font-label-sm text-base uppercase tracking-wider py-2 text-primary font-bold flex items-center gap-2"
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
