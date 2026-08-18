import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem('karisme_admin_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('karisme_admin_theme', next ? 'dark' : 'light');
      } catch {
        // fallback
      }
      return next;
    });
  };

  const navItems = [
    { path: '/admin', icon: 'monitoring', label: 'Métricas' },
    { path: '/admin/orders', icon: 'receipt_long', label: 'Órdenes' },
    { path: '/admin/inventory', icon: 'inventory_2', label: 'Inventario' },
    { path: '/admin/inventory-copy', icon: 'content_copy', label: 'Inventario (Copia)' },
    { path: '/admin/cms', icon: 'settings', label: 'Configuración CMS' },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col w-full transition-colors duration-300 ${
        isDarkMode ? 'dark-admin bg-[#0f0f11] text-[#f4f4f6]' : 'bg-background text-on-surface'
      }`}
    >
      {/* Mobile Top Header Bar */}
      <header className="md:hidden bg-surface-container border-b border-outline-variant px-[4%] py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs w-full">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant rounded-xl transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <span className="font-brand-script text-2xl text-on-surface">Karisme</span>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant rounded-xl transition-all cursor-pointer"
            title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            <span className="material-symbols-outlined text-xl">
              {isDarkMode ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          <Link
            to="/"
            className="text-xs text-secondary font-bold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            Ver Tienda
          </Link>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* SideNavBar (Percentage Fluid Width: 18% on desktop) */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[75%] sm:w-[45%] md:w-[18%] min-w-[220px] bg-surface-container border-r border-outline-variant flex flex-col gap-4 p-[1.5%] z-50 transition-transform duration-300 ${
          isMobileMenuOpen
            ? 'translate-x-0 shadow-2xl'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h1 className="font-headline-md text-on-surface tracking-tighter text-xl lg:text-2xl font-bold">
              Admin Dashboard
            </h1>
            <p className="font-label-sm text-on-surface-variant opacity-70 text-xs">
              Karisme Management
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1 text-on-surface-variant hover:text-error"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section with Theme Toggle */}
        <div className="mt-auto pt-4 border-t border-outline-variant/30 space-y-3">
          {/* Sidebar Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer font-label-sm text-xs ${
              isDarkMode
                ? 'bg-surface-container-high border-outline-variant text-primary shadow-xs'
                : 'bg-surface-container-low border-outline-variant/60 text-on-surface-variant hover:bg-surface-bright'
            }`}
            title="Alternar entre modo claro y modo oscuro"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">
                {isDarkMode ? 'dark_mode' : 'light_mode'}
              </span>
              <span className="font-bold">
                {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
              </span>
            </div>

            {/* Toggle Switch Graphic */}
            <div
              className={`w-9 h-5 rounded-full p-0.5 transition-colors relative flex items-center ${
                isDarkMode ? 'bg-primary justify-end' : 'bg-outline-variant/80 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs transition-transform" />
            </div>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-bright border border-outline-variant/40 text-xs text-secondary font-bold hover:bg-secondary/10 transition-colors"
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            Volver a Tienda Pública
          </Link>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 font-bold">
              <span className="material-symbols-outlined text-lg">person</span>
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-on-surface text-xs font-bold truncate">
                Admin Karisme
              </p>
              <p className="text-[10px] text-on-surface-variant/70 truncate">
                admin@karisme.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas (Fluid Percentage Width: 82% on desktop, 100% on mobile) */}
      <div className="w-full md:w-[82%] md:ml-[18%] p-[2.5%] max-w-none min-h-screen flex flex-col flex-1">
        <Outlet />

        {/* Footer */}
        <footer className="mt-auto border-t border-outline-variant/30 pt-8 md:pt-12 pb-8 md:pb-12 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[3%] mb-8">
            <div className="flex flex-col gap-3">
              <h4 className="font-brand-script text-3xl text-on-surface">Karisme</h4>
              <p className="font-body-md text-sm text-on-surface-variant opacity-70">
                Elevando el confort cotidiano con un enfoque minimalista y editorial.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-label-sm text-secondary uppercase font-bold text-xs">
                Empresa
              </h5>
              <a
                className="font-label-sm text-xs text-on-surface-variant hover:text-primary transition-all"
                href="#"
              >
                Sobre Nosotros
              </a>
              <a
                className="font-label-sm text-xs text-on-surface-variant hover:text-primary transition-all"
                href="#"
              >
                Sostenibilidad
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-label-sm text-secondary uppercase font-bold text-xs">
                Ayuda
              </h5>
              <a
                className="font-label-sm text-xs text-on-surface-variant hover:text-primary transition-all"
                href="#"
              >
                Envíos
              </a>
              <a
                className="font-label-sm text-xs text-on-surface-variant hover:text-primary transition-all"
                href="#"
              >
                Privacidad
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="font-label-sm text-secondary uppercase font-bold text-xs">
                Newsletter
              </h5>
              <div className="flex gap-2">
                <input
                  className="bg-transparent border-b border-outline-variant py-1 flex-1 font-body-md text-xs focus:outline-none focus:border-primary transition-colors"
                  placeholder="Email"
                  type="email"
                />
                <button type="button" className="text-primary">
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-outline-variant/10 text-center">
            <p className="font-label-sm text-[11px] text-secondary opacity-50 uppercase tracking-widest">
              © 2024 KARISME INNERWEAR. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
