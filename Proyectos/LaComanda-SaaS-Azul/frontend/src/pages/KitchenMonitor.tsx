import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

export const KitchenMonitor: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-900 min-h-screen flex text-slate-200">
            <Sidebar />
            <main className="ml-72 flex-grow flex flex-col h-screen overflow-hidden">
                <header className="flex justify-between items-center w-full px-8 h-16 border-b border-white/5 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-white tracking-tight">{t('kitchen.live_monitor')}</span>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('kitchen.active_station')}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="font-bold text-sm text-white">Chef Marco</p>
                            <p className="text-[10px] uppercase tracking-wider text-primary font-bold">{t('kitchen.exec_chef')}</p>
                        </div>
                        <img alt="Chef" className="w-10 h-10 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF5G192Xbar20BskAJ_WvxE3XJebjhN_pTdYnO9Z4Nk0_9MaGxAcQqEjrEwo4VAGRx15hmwKjsRSNobb3-YsDv5m-YcwlmgumndHApr9TW7Bzw35ZHZ7affB6nP0dGe6dUfTurtDOhnz6LV3JRxTzt6s_OFPrrvIXR4rproQqmCJKjvubwB8TwDV0l8lcmpdB2o5y1T7Hgd2ukIrvseqbjpm8f-xK8lNrjnoZi0jQEpqmSQEq80w2oFVV-uvXaltwYyg_JuKG7qfV9" />
                    </div>
                </header>
                <section className="flex-grow p-6 overflow-x-auto">
                    <div className="flex h-full gap-4 min-w-max pb-4">
                        {/* Urgent Ticket */}
                        <article className="flex flex-col w-80 bg-slate-800 rounded-2xl border-2 border-error urgent-pulse shadow-2xl overflow-hidden h-full max-h-[calc(100vh-140px)]">
                            <header className="bg-error text-white p-4 flex justify-between items-start">
                                <div>
                                    <span className="font-mono text-white/70 text-xs">#1024</span>
                                    <h2 className="text-2xl font-bold leading-tight">{t('kitchen.table')} 12</h2>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase mb-1">{t('kitchen.urgent')}</span>
                                    <span className="font-mono text-xl">18:45</span>
                                </div>
                            </header>
                            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-slate-700 flex items-center justify-center font-bold text-lg rounded-lg">2</div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-white">Wagyu Ribeye</p>
                                        <p className="text-xs text-error font-bold italic mt-1 uppercase">{t('kitchen.notes.medium_rare')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-slate-700 flex items-center justify-center font-bold text-lg rounded-lg">1</div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-white">Truffle Risotto</p>
                                        <p className="text-xs text-slate-400 italic mt-1">{t('kitchen.notes.extra_parm')}</p>
                                    </div>
                                </div>
                            </div>
                            <footer className="p-4 bg-slate-800/50 border-t border-white/5 space-y-3">
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <p className="text-[10px] font-bold text-error uppercase mb-1">{t('kitchen.instructions')}</p>
                                    <p className="text-xs text-slate-300">{t('kitchen.notes.allergy_peanuts')}</p>
                                </div>
                                <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/40">
                                    <span className="material-symbols-outlined">check_circle</span> {t('kitchen.ready')}
                                </button>
                            </footer>
                        </article>

                        {/* Normal Ticket */}
                        <article className="flex flex-col w-80 bg-slate-800 rounded-2xl border border-white/5 shadow-xl overflow-hidden h-full max-h-[calc(100vh-140px)]">
                            <header className="bg-slate-700 text-white p-4 flex justify-between items-start">
                                <div>
                                    <span className="font-mono text-white/50 text-xs">#1028</span>
                                    <h2 className="text-2xl font-bold leading-tight">{t('kitchen.table')} 04</h2>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="bg-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase mb-1">{t('kitchen.preparing')}</span>
                                    <span className="font-mono text-xl">08:12</span>
                                </div>
                            </header>
                            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-slate-700 flex items-center justify-center font-bold text-lg rounded-lg">4</div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-white">Classic Burger</p>
                                        <p className="text-xs text-slate-400 italic mt-1">{t('kitchen.notes.well_done')}</p>
                                    </div>
                                </div>
                            </div>
                            <footer className="p-4 bg-slate-800/50 border-t border-white/5">
                                <button className="w-full bg-slate-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-600 transition-all">{t('kitchen.ready')}</button>
                            </footer>
                        </article>

                        {/* Summary Column */}
                        <article className="w-64 h-full">
                            <div className="bg-slate-800/50 rounded-2xl p-5 space-y-6 border border-white/5">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('kitchen.stats')}</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-800 p-4 rounded-xl text-center border border-white/5">
                                        <p className="text-2xl font-bold text-primary">12</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">{t('kitchen.active')}</p>
                                    </div>
                                    <div className="bg-slate-800 p-4 rounded-xl text-center border border-white/5">
                                        <p className="text-2xl font-bold text-error">2</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">{t('kitchen.urgent')}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase border-b border-white/5 pb-2">{t('kitchen.top_items')}</h4>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-300">Burger</span>
                                        <span className="font-bold text-primary">24</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-300">Risotto</span>
                                        <span className="font-bold text-primary">18</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
                <footer className="h-12 bg-black/30 border-t border-white/5 flex items-center px-8 justify-between text-slate-400">
                    <div className="flex gap-6 items-center text-xs font-medium">
                        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">timer</span> {t('kitchen.last_update')}: 14:30:05</div>
                        <div className="flex items-center gap-2 text-primary"><span className="material-symbols-outlined text-sm">cloud_done</span> {t('kitchen.synced')}</div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-1 rounded bg-slate-800 text-white font-bold text-[10px] uppercase hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-xs">print</span> {t('kitchen.print_summary')}
                    </button>
                </footer>
            </main>
        </div>
    );
};
