import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/admin', icon: 'monitoring', label: 'Métricas' },
    { path: '/admin/orders', icon: 'receipt_long', label: 'Órdenes' },
    { path: '/admin/inventory', icon: 'inventory_2', label: 'Inventario' },
    { path: '/admin/cms', icon: 'settings', label: 'Configuración CMS' },
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col w-full">
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

        <Link
          to="/"
          className="text-xs text-secondary font-bold hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">storefront</span>
          Ver Tienda
        </Link>
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
        className={`fixed left-0 top-0 h-screen w-[75%] sm:w-[45%] md:w-[18%] min-w-[210px] bg-surface-container border-r border-outline-variant flex flex-col gap-4 p-[1.5%] z-50 transition-transform duration-300 ${
          isMobileMenuOpen
            ? 'translate-x-0 shadow-2xl'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="font-headline-md text-on-surface-variant tracking-tighter text-xl lg:text-2xl">
              Admin Dashboard
            </h1>
            <p className="font-label-sm text-on-surface-variant opacity-60 text-xs">
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

        <nav className="flex flex-col gap-2">
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

        <div className="mt-auto pt-6 border-t border-outline-variant/30">
          <Link
            to="/"
            className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-surface-bright text-xs text-secondary font-bold hover:bg-secondary/10 transition-colors"
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            Volver a Tienda Pública
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-on-surface text-xs truncate">
                Admin Karisme
              </p>
              <p className="text-[10px] text-on-surface-variant truncate">
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
