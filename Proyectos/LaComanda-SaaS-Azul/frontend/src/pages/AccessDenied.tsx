import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';

export const AccessDenied: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-background text-on-surface flex min-h-screen">
            <Sidebar />
            <main className="ml-64 flex-1 flex flex-col min-h-screen">
                <Header searchPlaceholder={t('access_denied.search')} />
                
                {/* Access Denied Canvas */}
                <div className="flex-1 flex items-center justify-center p-8 bg-surface-container-low/30 relative overflow-hidden">
                    {/* Atmospheric decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
                    
                    <section className="max-w-2xl w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Security Visual */}
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-125"></div>
                            <div className="relative bg-surface-container-lowest w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-sm border border-outline-variant/10 group cursor-pointer hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-6xl text-primary transition-transform group-hover:rotate-6 group-hover:scale-110 duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                            </div>
                            {/* Small decorative badge */}
                            <div className="absolute -bottom-2 -right-2 bg-tertiary text-on-tertiary w-10 h-10 rounded-full flex items-center justify-center border-4 border-background">
                                <span className="material-symbols-outlined text-sm">lock</span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-4">
                            <h2 className="text-5xl font-headline font-bold text-on-surface tracking-tight">
                                {t('access_denied.title')}
                            </h2>
                            <p className="text-lg text-on-surface-variant font-body max-w-lg mx-auto leading-relaxed">
                                {t('access_denied.message')}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/dashboard" className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold font-label flex items-center gap-3 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined">dashboard</span>
                                {t('access_denied.return_dash')}
                            </Link>
                            <button className="px-8 py-4 bg-surface-container-high text-primary rounded-xl font-bold font-label flex items-center gap-3 hover:bg-surface-container-highest transition-all border border-outline-variant/15">
                                <span className="material-symbols-outlined">request_quote</span>
                                {t('access_denied.req_perm')}
                            </button>
                        </div>

                        {/* Technical Details / Footer */}
                        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                            <div className="bg-surface-container-low p-4 rounded-xl">
                                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">{t('access_denied.network_status')}</p>
                                <p className="font-bold text-sm text-error">Error: 403 Forbidden</p>
                            </div>
                            <div className="bg-surface-container-low p-4 rounded-xl">
                                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">{t('access_denied.system_id')}</p>
                                <p className="font-bold text-sm">{t('access_denied.user_id')}: 1024</p>
                            </div>
                            <div className="bg-surface-container-low p-4 rounded-xl">
                                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">{t('access_denied.access_layer')}</p>
                                <p className="font-bold text-sm">{t('access_denied.level_admin')}</p>
                            </div>
                        </div>
                    </section>
                </div>
                
                {/* System Footer */}
                <footer className="h-12 border-t border-outline-variant/10 px-8 flex items-center justify-between text-[11px] font-label text-on-surface-variant opacity-50 uppercase tracking-tighter">
                    <div>© 2024 La Comanda Restaurant Management System</div>
                    <div className="flex gap-6">
                        <span>Politica de Privacidad</span>
                        <span>Terminos de Uso</span>
                        <span>Audit Log: #8821-XA</span>
                    </div>
                </footer>
            </main>

            {/* Floating Background Elements for Depth */}
            <div className="fixed inset-0 pointer-events-none -z-20">
                <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] left-[20%] w-[20%] h-[20%] bg-tertiary/10 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
};
