import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';

export const Settings: React.FC = () => {
    const [activeSection, setActiveSection] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const { t, i18n } = useTranslation();

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-background text-on-surface min-h-screen">
            <Sidebar />
            <Header />
            
            <main className="ml-64 p-12 max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-headline font-bold text-on-surface mb-2">{t('settings.title')}</h2>
                    <p className="text-on-surface-variant font-body">{t('settings.subtitle')}</p>
                </div>

                <div className="mb-6 relative w-full max-w-md hidden">
                    <input 
                        type="text" 
                        placeholder={t('settings.search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm font-body focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <nav className="col-span-3 flex flex-col gap-2 sticky top-24 h-fit">
                        <button 
                            onClick={() => scrollToSection('general')}
                            className={`flex items-center gap-3 p-4 rounded-xl transition-colors w-full text-left ${activeSection === 'general' ? 'bg-surface-container-highest text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            <span className="material-symbols-outlined">storefront</span>
                            <span className="font-label">{t('settings.nav_profile')}</span>
                        </button>
                        <button 
                            onClick={() => scrollToSection('operational')}
                            className={`flex items-center gap-3 p-4 rounded-xl transition-colors w-full text-left ${activeSection === 'operational' ? 'bg-surface-container-highest text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            <span className="material-symbols-outlined">schedule</span>
                            <span className="font-label">{t('settings.nav_operational')}</span>
                        </button>
                        <button 
                            onClick={() => scrollToSection('system')}
                            className={`flex items-center gap-3 p-4 rounded-xl transition-colors w-full text-left ${activeSection === 'system' ? 'bg-surface-container-highest text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            <span className="material-symbols-outlined">settings_suggest</span>
                            <span className="font-label">{t('settings.nav_system')}</span>
                        </button>
                        <button 
                            onClick={() => scrollToSection('security')}
                            className={`flex items-center gap-3 p-4 rounded-xl transition-colors w-full text-left ${activeSection === 'security' ? 'bg-surface-container-highest text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            <span className="material-symbols-outlined">shield</span>
                            <span className="font-label">{t('settings.nav_security')}</span>
                        </button>
                    </nav>

                    <div className="col-span-9 space-y-12 pb-24">
                        <section id="general" className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-px bg-primary/20"></div>
                                <h3 className="text-2xl font-headline text-on-surface">{t('settings.gen_profile')}</h3>
                            </div>
                            
                            <div className="bg-surface-container-lowest p-8 rounded-full border border-outline-variant/10 space-y-6">
                                <div className="flex items-start gap-8">
                                    <div className="relative group">
                                        <img 
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaXHV2G_Oq_iz-i2TG_WFiLLg-JyXKgxi4dmyVh81rA4_eykTD0dh_8-m-eRhE71UhVrhbAh55WS9yXx15oaU6CSHBsefHN-J_hr0MsD5FQIMd-rOz0SSt1dY1GCwTOSbIUkGJGn3ono0X_sqps0_PQhyqj1rp05ySyMOfY0JxcO7rcWVD1DTQSkKNjNzMYwmZ8Jl5Umap6eb9O7GUsyyNHxu1EWVbvJs9QGe_54OJKACld9ROLnSFJ83TMT1RwaGRlQLNK3G54wuW" 
                                            alt="La Comanda Logo" 
                                            className="w-32 h-32 rounded-full object-cover bg-surface-container-low border-2 border-primary/10" 
                                        />
                                        <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest">{t('settings.rest_name')}</label>
                                            <input type="text" defaultValue="La Comanda" className="bg-surface border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 font-body" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest">{t('settings.email')}</label>
                                            <input type="email" defaultValue="admin@lacomanda.com" className="bg-surface border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 font-body" />
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-1.5">
                                            <label className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest">{t('settings.address')}</label>
                                            <input type="text" defaultValue="Via dei Condotti, 86, 00187 Roma RM, Italy" className="bg-surface border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 font-body" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="operational" className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-px bg-primary/20"></div>
                                <h3 className="text-2xl font-headline text-on-surface">{t('settings.op_settings')}</h3>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-surface-container-low p-8 rounded-[2rem]">
                                    <h4 className="font-headline text-lg mb-6 text-on-surface">{t('settings.financials')}</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-label text-sm text-on-surface-variant">{t('settings.currency')}</span>
                                            <select defaultValue="EUR" className="bg-surface-container-lowest border-none rounded-lg text-sm font-label focus:ring-primary/20 p-2">
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-label text-sm text-on-surface-variant">{t('settings.tax')}</span>
                                            <div className="relative w-24">
                                                <input type="number" defaultValue="10.0" className="w-full bg-surface-container-lowest border-none rounded-lg text-sm text-right pr-6 focus:ring-primary/20 p-2" />
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-surface-container-low p-8 rounded-[2rem] relative overflow-hidden">
                                    <h4 className="font-headline text-lg mb-4 text-on-surface">{t('settings.hours')}</h4>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs font-label">
                                            <span className="text-on-surface-variant">{t('settings.mon_fri')}</span>
                                            <span className="font-bold text-on-surface">11:00 AM - 11:30 PM</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-label">
                                            <span className="text-on-surface-variant">{t('settings.sat_sun')}</span>
                                            <span className="font-bold text-on-surface">10:00 AM - 01:00 AM</span>
                                        </div>
                                    </div>
                                    <button className="mt-6 text-primary font-label text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                                        {t('settings.edit_time')} <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section id="system" className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-px bg-primary/20"></div>
                                <h3 className="text-2xl font-headline text-on-surface">{t('settings.sys_pref')}</h3>
                            </div>
                            
                            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 grid grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="material-symbols-outlined text-tertiary">language</span>
                                        <h4 className="font-label font-bold text-on-surface">{t('settings.language')}</h4>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => i18n.changeLanguage('en')}
                                            className={`flex-1 py-3 rounded-xl text-sm font-label transition-colors ${i18n.language === 'en' ? 'border border-primary bg-primary-container/10 text-primary font-bold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
                                        >
                                            {t('settings.english')}
                                        </button>
                                        <button 
                                            onClick={() => i18n.changeLanguage('es')}
                                            className={`flex-1 py-3 rounded-xl text-sm font-label transition-colors ${i18n.language === 'es' ? 'border border-primary bg-primary-container/10 text-primary font-bold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
                                        >
                                            {t('settings.spanish')}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="material-symbols-outlined text-tertiary">notifications_active</span>
                                        <h4 className="font-label font-bold text-on-surface">{t('settings.alerts')}</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span className="text-sm font-body text-on-surface-variant">{t('settings.sound')}</span>
                                            <div className="relative inline-flex items-center">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </div>
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span className="text-sm font-body text-on-surface-variant">{t('settings.push')}</span>
                                            <div className="relative inline-flex items-center">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="security" className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-px bg-primary/20"></div>
                                <h3 className="text-2xl font-headline text-on-surface">{t('settings.sec_access')}</h3>
                            </div>
                            
                            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-error-container/20 flex items-center justify-center text-error">
                                            <span className="material-symbols-outlined">lock_reset</span>
                                        </div>
                                        <div>
                                            <h4 className="font-label font-bold text-on-surface">{t('settings.change_pass')}</h4>
                                            <p className="text-xs text-on-surface-variant">{t('settings.pass_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest">{t('settings.current_pass')}</label>
                                        <input type="password" placeholder="••••••••••••" className="bg-surface border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 font-body" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest">{t('settings.new_pass')}</label>
                                        <input type="password" placeholder="" className="bg-surface border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 font-body" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest">{t('settings.confirm_pass')}</label>
                                        <input type="password" placeholder="" className="bg-surface border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 font-body" />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-3">
                                    <button className="px-6 py-3 text-sm font-label font-bold text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">{t('settings.discard')}</button>
                                    <button className="px-8 py-3 bg-primary text-white rounded-full text-sm font-label font-bold shadow-md hover:bg-primary-container transition-all">{t('settings.update')}</button>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <div className="fixed bottom-8 right-8 flex gap-3 z-50">
                <button className="flex items-center gap-2 px-6 py-4 bg-inverse-surface text-inverse-on-surface rounded-full shadow-2xl font-label font-bold hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">save</span>
                    {t('settings.save')}
                </button>
            </div>
        </div>
    );
};
