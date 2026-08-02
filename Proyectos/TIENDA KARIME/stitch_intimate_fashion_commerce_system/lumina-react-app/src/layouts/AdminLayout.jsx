import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', icon: 'monitoring', label: 'Métricas' },
    { path: '/admin/orders', icon: 'receipt_long', label: 'Órdenes' },
    { path: '/admin/inventory', icon: 'inventory_2', label: 'Inventario' },
    { path: '/admin/cms', icon: 'settings', label: 'Configuración CMS' }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container border-r border-outline-variant flex flex-col gap-4 p-6 z-50">
        <div className="mb-8">
          <h1 className="font-headline-md text-on-surface-variant tracking-tighter">Admin Dashboard</h1>
          <p className="font-label-sm text-on-surface-variant opacity-60">Karisme Management</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary-container text-on-primary-container font-bold scale-[0.98]' 
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface text-xs">Admin Karisme</p>
              <p className="text-[10px] text-on-surface-variant">admin@karisme.com</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content Canvas */}
      <div className="ml-64 p-margin-desktop max-w-container-max mx-auto min-h-screen flex flex-col">
        <Outlet />
        
        {/* Footer */}
        <footer className="mt-auto border-t border-outline-variant/30 pt-12 pb-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-brand-script text-3xl text-on-surface">Karisme</h4>
              <p className="font-body-md text-on-surface-variant opacity-70">Elevando el confort cotidiano con un enfoque minimalista y editorial.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-label-sm text-secondary uppercase">Empresa</h5>
              <a className="font-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Sobre Nosotros</a>
              <a className="font-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Sostenibilidad</a>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-label-sm text-secondary uppercase">Ayuda</h5>
              <a className="font-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Envíos</a>
              <a className="font-label-sm text-on-surface-variant hover:text-primary transition-all" href="#">Privacidad</a>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-label-sm text-secondary uppercase">Newsletter</h5>
              <div className="flex gap-2">
                <input className="bg-transparent border-b border-outline-variant py-1 flex-1 font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="Email" type="email" />
                <button className="text-primary"><span className="material-symbols-outlined">arrow_forward</span></button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-outline-variant/10 text-center">
            <p className="font-label-sm text-secondary opacity-50 uppercase tracking-widest">© 2024 KARISME INNERWEAR. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
