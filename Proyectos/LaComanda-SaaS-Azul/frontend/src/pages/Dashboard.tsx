import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';

export const Dashboard: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="ml-72 flex flex-col min-h-screen">
                <Header title="Analytics Dashboard" />
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg"><span className="material-symbols-outlined">payments</span></div>
                                <span className="text-green-600 font-bold text-xs flex items-center">+12% <span className="material-symbols-outlined text-sm">trending_up</span></span>
                            </div>
                            <div className="mt-4">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.total_sales')}</p>
                                <h2 className="text-2xl font-bold text-slate-800 mt-1">$4,285.50</h2>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><span className="material-symbols-outlined">table_restaurant</span></div>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">85% LOAD</span>
                            </div>
                            <div className="mt-4">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.active_tables')}</p>
                                <h2 className="text-2xl font-bold text-slate-800 mt-1">24 <span className="text-sm font-normal text-slate-400">/ 28</span></h2>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between border-l-4 border-l-error hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-red-50 text-error rounded-lg"><span className="material-symbols-outlined">warning</span></div>
                                <button className="text-error text-xs font-bold underline">{t('dashboard.view_all')}</button>
                            </div>
                            <div className="mt-4">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.inventory_alerts')}</p>
                                <h2 className="text-2xl font-bold text-slate-800 mt-1">07 <span className="text-sm font-normal text-error">{t('dashboard.items_low')}</span></h2>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><span className="material-symbols-outlined">timer</span></div>
                                <span className="text-purple-600 font-bold text-xs uppercase">Fast</span>
                            </div>
                            <div className="mt-4">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.avg_fulfillment')}</p>
                                <h2 className="text-2xl font-bold text-slate-800 mt-1">18 <span className="text-sm font-normal text-slate-400">{t('dashboard.mins')}</span></h2>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-lg font-bold">{t('dashboard.peak_volume')}</h3>
                                    <p className="text-slate-400 text-sm">{t('dashboard.peak_desc')}</p>
                                </div>
                                <select className="bg-slate-50 border-none rounded-lg px-4 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-primary">
                                    <option>{t('dashboard.last_24h')}</option>
                                    <option>{t('dashboard.last_7d')}</option>
                                </select>
                            </div>
                            <div className="relative h-64 w-full flex items-end gap-2 px-2">
                                {[30, 45, 60, 95, 85, 55, 40, 30, 20].map((h, i) => (
                                    <div key={i} className={`flex-1 transition-all rounded-t-lg relative group ${h === 95 ? 'bg-primary' : 'bg-slate-100 hover:bg-primary/20'}`} style={{ height: `${h}%` }}>
                                        {h === 95 && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-[10px] whitespace-nowrap">Peak</span>}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-mono px-2">
                                <span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span><span>22:00</span><span>00:00</span>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl p-6">
                            <h3 className="text-lg font-bold mb-6">{t('dashboard.top_performers')}</h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Marco Rossi', val: '$1.2k', p: '88%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAXc4lM1pvYefhApergUIkYWr5lgVIL39t4mceX4S0dmxEZ01AXfoJ4tU-rMb0v4xAwWCmDRGcj8uObKKi_S3h-HecKn7Z7teZBafm94VE3M__wMr4u9sJHZA5Cnj8OPK1kXWzQ4NsOM_pEAd-kctCiFL-NkYgTXG51twDZC0_wRF5fUpbjmhQck3tYIZUpL764YD_pMyJbuN7rGthWf0Nc7g9YRS5Rtan1ffZxhFgyWNlLf3nac1TeGXHErkt2ZPxmfnmhsbAxByr' },
                                    { name: 'Elena Vance', val: '$940', p: '72%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC55BNAMFz37J952OEaQJRqbCv8286A2J-9GpDDQKh9NPG6UmpJcX_9LNgabBfDEGaNaTUgrVqaMf83ddIf6wEz2bRkBW79kEbJ81LdeCutWaGhZG-LS1TeuBKY1H_zofojYqWKiWd24KCJMKBNZPcA-8fxeO__EkruAMpJmoxMDBrx5694UrENJ7NBpqCAJsVjxfsgUGFRgb7KTSnHA2c7seYgtD6aU977MEExV8I_OigCZ1iY0QLLg_w4iJ0jPY4MwyPzXuES1eZc' },
                                    { name: 'Julian S.', val: '$810', p: '64%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC55_PpKPzfkc4Yd807GL-zLZSl4rV9rE98PpQq9Bqg71FJKXW85cCed2PW5MGWj5LPjrzkwl5NMmjuiNFVosv2j0MGWaRI5NoU_BBSWI0bWbs0WXPMLgNTpIAwspdMTiW9uDayFt-pm0L0T4eVShs7gtNqSF1Bfh4R3FnlM85g9yPxJFzbepOYAH6dtc620cTjvOLSc8xuVlCawqVsIIcENXH8QSdAX9PYuUOG6S5pmxMBtZHUXu1goMJ-eg1lcE_2aJgyd1z8NUao' }
                                ].map((staff, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <img alt={staff.name} className="w-10 h-10 rounded-full object-cover" src={staff.img} />
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-center">
                                                <p className="font-bold text-sm">{staff.name}</p>
                                                <p className="text-primary font-bold text-sm">{staff.val}</p>
                                            </div>
                                            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                                                <div className="bg-primary h-1.5 rounded-full" style={{ width: staff.p }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-2 text-primary font-bold text-xs hover:bg-primary/10 rounded-lg transition-colors">{t('dashboard.view_insights')}</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
