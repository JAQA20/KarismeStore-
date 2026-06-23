import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';

export const StaffControl: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-background text-on-surface flex overflow-hidden selection:bg-primary/20">
            <Sidebar />
            <main className="ml-64 w-[calc(100%-16rem)] min-h-screen flex flex-col relative overflow-y-auto">
                <Header searchPlaceholder={t('staff.search')} />
                
                {/* Content Canvas */}
                <div className="p-8 max-w-7xl mx-auto w-full">
                    {/* Page Header */}
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-4xl font-headline text-on-surface mb-2">{t('staff.title')}</h2>
                            <p className="text-on-surface-variant font-body">{t('staff.subtitle')}</p>
                        </div>
                        <button className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-3 rounded-full font-label font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-[0.98]">
                            <span className="material-symbols-outlined">add</span>
                            {t('staff.new_member')}
                        </button>
                    </div>

                    {/* Stats Bar (Tonal Hierarchy) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-surface-container-low p-6 rounded-full flex items-center justify-between group transition-all hover:bg-surface-container">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                                </div>
                                <div>
                                    <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">{t('staff.active_staff')}</p>
                                    <p className="text-2xl font-headline font-bold">24 / 28</p>
                                </div>
                            </div>
                            <span className="text-xs text-tertiary font-bold bg-tertiary-fixed px-3 py-1 rounded-full">{t('staff.live')}</span>
                        </div>
                        <div className="bg-surface-container-low p-6 rounded-full flex items-center justify-between group transition-all hover:bg-surface-container">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event_busy</span>
                                </div>
                                <div>
                                    <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">{t('staff.pending_shifts')}</p>
                                    <p className="text-2xl font-headline font-bold">06</p>
                                </div>
                            </div>
                            <span className="text-xs text-on-surface-variant font-medium bg-surface-container-high px-3 py-1 rounded-full">{t('staff.upcoming')}</span>
                        </div>
                        <div className="bg-surface-container-low p-6 rounded-full flex items-center justify-between group transition-all hover:bg-surface-container">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                                </div>
                                <div>
                                    <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">{t('staff.avg_perf')}</p>
                                    <p className="text-2xl font-headline font-bold">94.2%</p>
                                </div>
                            </div>
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full border-2 border-surface-container-low overflow-hidden">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLwy46vO753nSB5h8dUIARc-XWoeuZH_N6T_gurh-oAAlI1-3EyGFTUCXmskzwtR-JbmWELtWfmdo5PxjqhEg8YLRkicCPHY4ew0Fmd66sE4MnO5Q79EDIBv_LPICmIVm5TN31vUDd2wLnCgTQonde0ThmFkiJO1uStjerTMjEgGkIE1W_8Q12pQdQmlI0ppC2PjOZ1UsHK8LS1Pz856nhl-KqUu_2qIDdIST3rJxiFpObY8oCEHO-kA" alt="User 1" />
                                </div>
                                <div className="w-6 h-6 rounded-full border-2 border-surface-container-low overflow-hidden">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI69mO0pmGsvWqb3b5aJhy1qlmMsn_O3NNci4Rr0d1lGlLCWz6Y3YEJFzCBYuuf2d3B2i-qAAcyLB_oV9G1f0-0JBpHBO0b953fvjCVD7DKn4rtXYKP4IwTtP4fewe6us0x41L0Qs3EnotkXPXTUut1zdNlqkGLy_TPUmZL4U9bV2zhjAC1TCPuCWN-yeO3YkWVa60JUPVco3krcAeuO4b1jPH-JGrvy8luRgH1XlRY5tZMOU_cbGhdg" alt="User 2" />
                                </div>
                                <div className="w-6 h-6 rounded-full bg-primary text-[8px] flex items-center justify-center text-white border-2 border-surface-container-low font-bold">+18</div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Bar & Table Area */}
                    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden">
                        <div className="p-6 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low/50">
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 rounded-full text-sm font-label font-bold bg-primary text-white">{t('staff.all')}</button>
                                <button className="px-4 py-2 rounded-full text-sm font-label font-medium text-on-surface-variant hover:bg-surface-container transition-colors">{t('staff.managers')}</button>
                                <button className="px-4 py-2 rounded-full text-sm font-label font-medium text-on-surface-variant hover:bg-surface-container transition-colors">{t('staff.waiters')}</button>
                                <button className="px-4 py-2 rounded-full text-sm font-label font-medium text-on-surface-variant hover:bg-surface-container transition-colors">{t('staff.chefs')}</button>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-label text-on-surface-variant uppercase tracking-tighter">{t('staff.filter_status')}</span>
                                <select className="bg-transparent border-none text-sm font-bold font-label focus:ring-0 cursor-pointer text-primary">
                                    <option>{t('staff.all_statuses')}</option>
                                    <option>{t('staff.online')}</option>
                                    <option>{t('staff.offline')}</option>
                                    <option>{t('staff.on_break')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-outline-variant/10">
                                        <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant">{t('staff.name_id')}</th>
                                        <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant">{t('staff.role')}</th>
                                        <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant">{t('staff.status')}</th>
                                        <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant">{t('staff.contact')}</th>
                                        <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant text-right">{t('staff.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/5">
                                    <tr className="hover:bg-surface-container-low/30 transition-all hover:translate-x-1 group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-j_u609UcxRaBheQ3SCQsHszrZ_kPlMkV9eTPfvy-B369yRveya8Dcvgw1emSYO1HtYGFUjt5bYOapM5DEag4vGT8wIYWVPpe97EYMfVav9iAlO92A-MML04G5x__kgV-Sz_JlhcPblgi5UeQZHgs9F3EB93crmZ3SC5EYkpCu67M8rSJKnQ2hN8MGc2FPY2jCV31ap6ucw6He_KbFLFX-V_rg0ksWOHLwd8IiyR3-ACdXQHNmds5tg" alt="Lucia" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-on-surface">Lucía Mendoza</p>
                                                    <p className="text-xs text-on-surface-variant">ID: LC-9442</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-label font-bold px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full">{t('staff.manager')}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                <span className="text-sm font-medium">{t('staff.online')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-label">l.mendoza@lacomanda.com</p>
                                            <p className="text-xs text-on-surface-variant">+34 600 123 456</p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-low/30 transition-all hover:translate-x-1 group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh_Nx1WAM9uZekjQUx9fdBjOS0k2qjd9PmS2J6yo281cm8MO7UxQJ0K7-nvNnQK40QasRSF77CVT6mz-8dyrhoEi3X7KMVktbPYVqi1yGQVLK2dzoNW2hwnjIeSVLD-QdOCDPKKWe6cnty5Fh9eZsz0R6TOEfHnAfNaACpYKPRE9sp6uCqc76hPmacyyRoCYDdPXVuzE3NxSXPa0neEnHiqQlF1GuDBskMx5dI_nOYX1Oyo9oQ50aiIA" alt="Mateo" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-on-surface">Mateo Ricci</p>
                                                    <p className="text-xs text-on-surface-variant">ID: LC-1021</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-label font-bold px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full">{t('staff.waiter')}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                                                <span className="text-sm font-medium">{t('staff.on_break')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-label">m.ricci@lacomanda.com</p>
                                            <p className="text-xs text-on-surface-variant">+34 600 987 654</p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-low/30 transition-all hover:translate-x-1 group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGzbeOEs75zFaQHyu-dMmMAOM0rTXnFdHXB2mAEIYQ3eHtRyeJyIql5kixApcv3T3R2glWXGM7-lpJXxJXmr_2WNBVXZGYtEMER5fEix8lIqOfQPqjvbNSLoxRk6KaLpFP_kEucXGTKSJ736buyV1BeLC3k26faZ4U1A4qqmHRUT-n6-5cpBBDSmNSTOQKISjyootd1uNeoBkALYhIY7CROC-eSqrP2lEbdrjR9QAV4pbgD5WngqNbMA" alt="Chef Ferran" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-on-surface">Chef Ferran</p>
                                                    <p className="text-xs text-on-surface-variant">ID: LC-0005</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-label font-bold px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full">{t('staff.exec_chef')}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                <span className="text-sm font-medium">{t('staff.online')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-label">f.adri@lacomanda.com</p>
                                            <p className="text-xs text-on-surface-variant">+34 600 555 123</p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-low/30 transition-all hover:translate-x-1 group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7s0kxpDPqaIriwLqNxiD-dUVZ3gLstUhooPxrW64Ds7Eoy05RMylwuS_frR4trCL8TusQ_A__DisHytiS8nTG__EGECfp8QR-45W5px78cTpdB-SdxzTn-3rK3KKlgPmIwlpD1XG7uAegf5zqauiPMXPZaHm3Q2C6NuA2dA_Cc38OriGRGi44cI2yC6dJX2h61BjgcX8Xhmd5oc7_l1IjRDmOJTZDhPREO8yO4fsIszTb1k1HwDnngA" alt="Elena" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-on-surface">Elena Soler</p>
                                                    <p className="text-xs text-on-surface-variant">ID: LC-2231</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-label font-bold px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full">{t('staff.waiter')}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
                                                <span className="text-sm font-medium text-on-surface-variant">{t('staff.offline')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-label">e.soler@lacomanda.com</p>
                                            <p className="text-xs text-on-surface-variant">+34 600 444 777</p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Footer */}
                        <div className="p-6 border-t border-outline-variant/10 flex items-center justify-between">
                            <p className="text-sm text-on-surface-variant font-label">{t('staff.showing')} <span className="font-bold">4</span> {t('staff.of')} <span className="font-bold">28</span> {t('staff.employees')}</p>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-xl flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white font-bold font-label">1</button>
                                <button className="w-10 h-10 rounded-xl flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors">2</button>
                                <button className="w-10 h-10 rounded-xl flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors">3</button>
                                <button className="w-10 h-10 rounded-xl flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
