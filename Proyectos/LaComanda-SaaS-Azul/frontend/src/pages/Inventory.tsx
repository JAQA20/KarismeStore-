import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';

export const Inventory: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-background text-on-surface flex overflow-hidden">
            <Sidebar />
            <main className="ml-64 w-[calc(100%-16rem)] min-h-screen flex flex-col relative overflow-y-auto">
                <Header searchPlaceholder={t('inventory.search')} />
                
                {/* Canvas */}
                <div className="p-8 space-y-8">
                    {/* Header Section */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">{t('inventory.title')}</h2>
                            <p className="text-on-surface-variant mt-1 font-body">{t('inventory.subtitle')}</p>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-high text-primary rounded-full font-label font-bold hover:bg-primary hover:text-white transition-all duration-300 group">
                            <span className="material-symbols-outlined">add_circle</span>
                            {t('inventory.register_entry')}
                        </button>
                    </div>

                    {/* Summary Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stock Value */}
                        <div className="bg-surface-container-lowest p-6 rounded-full flex flex-col justify-between group hover:bg-surface-container transition-colors duration-300">
                            <div className="flex justify-between items-start">
                                <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">{t('inventory.total_value')}</span>
                                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                    <span className="material-symbols-outlined">payments</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-3xl font-headline font-bold">$42,850.00</h3>
                                <p className="text-xs text-on-surface-variant mt-1 font-medium">+12% {t('inventory.vs_last_month')}</p>
                            </div>
                        </div>

                        {/* Low Stock Alerts */}
                        <div className="bg-error-container/20 p-6 rounded-full flex flex-col justify-between border-none">
                            <div className="flex justify-between items-start">
                                <span className="text-on-error-container font-label text-xs uppercase tracking-widest">{t('inventory.low_alerts')}</span>
                                <div className="p-2 bg-error-container text-on-error-container rounded-xl">
                                    <span className="material-symbols-outlined">warning</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-3xl font-headline font-bold text-on-error-container">14 {t('inventory.items')}</h3>
                                <p className="text-xs text-on-error-container/80 mt-1 font-medium underline cursor-pointer">{t('inventory.view_critical')}</p>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-surface-container-lowest p-6 rounded-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">{t('inventory.recent_shipments')}</span>
                                <div className="p-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl">
                                    <span className="material-symbols-outlined">local_shipping</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-3xl font-headline font-bold">08 {t('inventory.pending')}</h3>
                                <p className="text-xs text-on-surface-variant mt-1 font-medium">3 {t('inventory.arriving_today')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Table Controls */}
                    <div className="flex items-center justify-between gap-4 py-2">
                        <div className="flex items-center gap-2">
                            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2 text-sm font-label cursor-pointer hover:bg-surface-container-high transition-colors">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                {t('inventory.all_categories')}
                            </div>
                            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2 text-sm font-label cursor-pointer hover:bg-surface-container-high transition-colors">
                                {t('inventory.status_in_stock')}
                            </div>
                        </div>
                        <div className="text-xs font-label text-on-surface-variant">
                            {t('inventory.showing')} <strong>42</strong> {t('inventory.items_lower')}
                        </div>
                    </div>

                    {/* Inventory Table */}
                    <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low/50">
                                    <th className="px-8 py-5 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">{t('inventory.item_name')}</th>
                                    <th className="px-6 py-5 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">{t('inventory.category')}</th>
                                    <th className="px-6 py-5 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">{t('inventory.current_stock')}</th>
                                    <th className="px-6 py-5 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">{t('inventory.reorder_point')}</th>
                                    <th className="px-6 py-5 text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">{t('inventory.status')}</th>
                                    <th className="px-8 py-5 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                <tr className="hover:bg-surface transition-colors cursor-pointer">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-surface-container overflow-hidden">
                                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA_mucqRmtOHGfvbGDtfxwVU-TNJFnWfVeJz8bWZXpJ8N1HvenLBkonEn2keb9VODlf3bql5KK0sbgJaI3Yzef0CbT5manRprmjPahPBobgOYeLn0CosYwRtuAyygNLEn2uCmvj89lL6AUZPBhMn84XxSRfeYYO4C0ql-vqvw4hsXR-NJ7Qt8r6BuCzG8wcPke_02-f2m2rtSpQojmbk7a6_bHbBbMVNf9A5ens753dPCaMFjU-zcFZA" alt="Wagyu" />
                                            </div>
                                            <div>
                                                <div className="font-body font-semibold text-on-surface">Wagyu Ribeye A5</div>
                                                <div className="text-xs text-on-surface-variant">{t('inventory.sku')} MEAT-042</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[11px] font-label font-bold uppercase">{t('inventory.meat')}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-body text-sm font-medium">24.5 kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-body text-sm text-on-surface-variant">10.0 kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-primary font-label text-xs font-bold uppercase">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            {t('inventory.in_stock')}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <button className="text-on-surface-variant hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-surface transition-colors cursor-pointer">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-surface-container overflow-hidden">
                                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuk2q6sKtOM8PxhvUzxzuwhkcWGnq-xnOeNSIr_5TrsPsL4-nu0NRongtc8aqnflSXRksMMmmK_PHd6vkcF4fDFmLbQsbuVsaGTl9TfrscDh1U7irgc1GjrdW2jmvu-y6zukj4_krD-iKylQZrC3_SVBweN3lND-EtwBs__-opPQs58StHAC8q3VqrDWfFtRqiIQNeB2QMal7W9E6rdDez_HSdtYcR2jsKoqPFsPZEPM9tRag437A2ZA" alt="Tomatoes" />
                                            </div>
                                            <div>
                                                <div className="font-body font-semibold text-on-surface">Heirloom Tomatoes</div>
                                                <div className="text-xs text-on-surface-variant">{t('inventory.sku')} VEG-109</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[11px] font-label font-bold uppercase">{t('inventory.produce')}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-body text-sm font-medium text-error">3.2 kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-body text-sm text-on-surface-variant">8.0 kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-error font-label text-xs font-bold uppercase">
                                            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                                            {t('inventory.low_stock')}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <button className="text-on-surface-variant hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-surface transition-colors cursor-pointer">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-surface-container overflow-hidden">
                                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvKVsebHne-4XUQ2a3INhDRRUoajcNvIfmyNjx86qhm72HsSnuMS2z8Z95_z4VtbD8h-DczejiHPUpQoBTUdVgLl8LjrlsfDcXqosjyuL6bFE_tXIjFQvUTIC4bP2N7JuACjA28VCq0DPwmiUikN177lMDnWbb6qxRvjsk1ytFuuwMUnpCGdsmrtiSjCN6h7aHBHlmuralh0IIKQ5Xj-EzgYa7Y17pB4-_ZZnQcEsA2H9fCGw21qiqPA" alt="Beverage" />
                                            </div>
                                            <div>
                                                <div className="font-body font-semibold text-on-surface">San Pellegrino 750ml</div>
                                                <div className="text-xs text-on-surface-variant">{t('inventory.sku')} BEV-231</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[11px] font-label font-bold uppercase">{t('inventory.beverage')}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-body text-sm font-medium">120 {t('inventory.units')}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-body text-sm text-on-surface-variant">24 {t('inventory.units')}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-primary font-label text-xs font-bold uppercase">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            {t('inventory.in_stock')}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <button className="text-on-surface-variant hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-surface transition-colors cursor-pointer">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-surface-container overflow-hidden">
                                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArJnCHqhjEZz6OHoe2om46H8bhL0OwFp2kA-YsaoiviOHXTVFmEhmMC__GZ9C0q5ivOuvvA_gwfIzhvfnTnOejA5TKwGqZgCURbE7W0Kn-qdVaw5k3FfkVz2Et6wMuXbVAcouLc3neGCsToo4W2gf1nEm-XTe0GrukbvLMvoUmkWWdRfINaOVfOagC8KWEGMwvZXVdD64aMQpOaNf6ONRQIiSBR-X2FNtOe91RIxrCOWX9RGpg8RRGGA" alt="Produce" />
                                            </div>
                                            <div>
                                                <div className="font-body font-semibold text-on-surface">Hass Avocado Premium</div>
                                                <div className="text-xs text-on-surface-variant">{t('inventory.sku')} VEG-002</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[11px] font-label font-bold uppercase">{t('inventory.produce')}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-body text-sm font-medium">45.0 kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-body text-sm text-on-surface-variant">15.0 kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-primary font-label text-xs font-bold uppercase">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            {t('inventory.in_stock')}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <button className="text-on-surface-variant hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        {/* Pagination */}
                        <div className="px-8 py-5 bg-surface-container-low/30 flex justify-between items-center">
                            <button className="text-xs font-label font-bold text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                                {t('inventory.prev')}
                            </button>
                            <div className="flex gap-2">
                                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</span>
                                <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant text-xs font-bold cursor-pointer transition-colors">2</span>
                                <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant text-xs font-bold cursor-pointer transition-colors">3</span>
                            </div>
                            <button className="text-xs font-label font-bold text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors">
                                {t('inventory.next')}
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    {/* Contextual Insight (Low Stock Detail) */}
                    <div className="bg-primary/5 rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 items-center border border-primary/10">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-[10px] font-label font-bold uppercase tracking-widest">
                                {t('inventory.smart_rec')}
                            </div>
                            <h4 className="text-2xl font-headline font-bold text-primary">{t('inventory.restock_veg')}</h4>
                            <p className="text-on-surface-variant font-body" dangerouslySetInnerHTML={{ __html: t('inventory.restock_desc') }} />
                            <div className="flex gap-4 pt-2">
                                <button className="px-6 py-2 bg-primary text-white rounded-full font-label text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                                    {t('inventory.gen_order')}
                                </button>
                                <button className="px-6 py-2 text-on-surface-variant font-label text-sm font-bold hover:underline">
                                    {t('inventory.ignore')}
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 h-48 bg-white/40 rounded-3xl relative overflow-hidden backdrop-blur-sm border border-white/50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-7xl text-primary opacity-20">shopping_cart_checkout</span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Floating Footer for Data Updates */}
                <div className="fixed bottom-8 right-8 flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/10 shadow-2xl z-50">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-tight">{t('inventory.syncing')}</span>
                </div>
            </main>
        </div>
    );
};
