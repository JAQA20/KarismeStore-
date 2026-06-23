import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@clerk/clerk-react';

export const Sidebar: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const { signOut } = useAuth();
    const active = location.pathname.substring(1) || 'dashboard';

    const navItems = [
        { id: 'dashboard', label: t('sidebar.dashboard'), icon: 'dashboard', path: '/dashboard' },
        { id: 'tables', label: t('sidebar.table_view'), icon: 'grid_view', path: '/tables' },
        { id: 'kitchen', label: t('sidebar.kitchen_monitor'), icon: 'chef_hat', path: '/kitchen' },
        { id: 'inventory', label: t('sidebar.inventory'), icon: 'inventory_2', path: '/inventory' },
        { id: 'staff', label: t('sidebar.staff_control'), icon: 'badge', path: '/staff' },
    ];

    return (
        <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-lowest flex flex-col py-6 px-4 z-50">
            <div className="mb-8 px-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                </div>
                <div>
                    <h1 className="text-2xl font-headline font-bold text-primary">La Comanda</h1>
                    <p className="text-xs font-label text-on-surface-variant tracking-wider uppercase">{t('sidebar.admin_terminal')}</p>
                </div>
            </div>
            
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = active === item.id || (active === '' && item.id === 'dashboard');
                    return (
                        <Link 
                            key={item.id}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                isActive 
                                ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                                : 'text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                            <span className={`font-label text-sm ${isActive ? '' : 'font-medium'}`}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 space-y-1 border-t border-outline-variant/15">
                <button className="w-full mb-4 py-3 px-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-label text-sm font-bold shadow-md hover:opacity-90 transition-all active:scale-95">
                    {t('sidebar.new_order')}
                </button>
                <Link to="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active === 'settings' ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: active === 'settings' ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
                    <span className={`font-label text-sm ${active === 'settings' ? '' : 'font-medium'}`}>{t('sidebar.settings')}</span>
                </Link>
                <Link to="/support" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active === 'support' ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: active === 'support' ? "'FILL' 1" : "'FILL' 0" }}>help</span>
                    <span className={`font-label text-sm ${active === 'support' ? '' : 'font-medium'}`}>{t('sidebar.support')}</span>
                </Link>
                <button onClick={() => signOut()} className="flex w-full items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 transition-colors rounded-xl mt-2">
                    <span className="material-symbols-outlined text-xl">logout</span>
                    <span className="font-label text-sm font-medium">{t('sidebar.logout')}</span>
                </button>
            </div>
        </aside>
    );
};
