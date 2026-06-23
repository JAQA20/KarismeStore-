import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';

export const TableView: React.FC = () => {
    const { t } = useTranslation();

    const tables = [
        { id: '08', type: 'Occupied', diners: 4, elapsed: '42m', total: '$124.50', status: 'primary', activity: 'Drinks served' },
        { id: '12', type: 'Available', diners: 6, elapsed: 'Ready', total: '$0.00', status: 'green-500', activity: 'No active order' },
        { id: '03', type: 'Pending Billing', diners: 2, elapsed: '1h 15m', total: '$78.20', status: 'sky-400', activity: 'Bill requested' },
        { id: '21', type: 'Occupied', diners: 5, elapsed: '18m', total: '$45.00', status: 'primary', activity: 'Mains ordering' },
        { id: '05', type: 'Available', diners: 4, elapsed: 'Cleaned', total: '$0.00', status: 'green-500', activity: 'No active order' },
        { id: '11', type: 'Occupied', diners: 2, elapsed: '2h 05m', total: '$212.00', status: 'primary', activity: 'Desserts served' },
        { id: '15', type: 'Available', diners: 8, elapsed: 'Ready', total: '$0.00', status: 'green-500', activity: 'No active order' },
        { id: '01', type: 'Occupied', diners: 3, elapsed: '5m', total: '$0.00', status: 'primary', activity: 'Water served' },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="ml-72 flex flex-col min-h-screen">
                <Header title={t('tables.title')} />
                <section className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">{t('tables.main_room')}</h2>
                            <p className="text-slate-500">{t('tables.subtitle')}</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                                <div className="flex items-center gap-1.5 px-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                                    <span className="text-[10px] font-bold uppercase">{t('tables.free_count')}</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 border-l border-slate-200">
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                    <span className="text-[10px] font-bold uppercase">{t('tables.busy_count')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tables.map((table) => (
                            <div key={table.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className={`h-1.5 bg-${table.status}`}></div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${table.type === 'Available' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>{t(`tables.types.${table.type}`)}</span>
                                            <h3 className="font-mono text-xl font-bold mt-1">{t('tables.table_num')} {table.id}</h3>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-xs text-slate-500">{table.diners} {t('tables.diners')}</span>
                                            <span className="text-primary font-mono text-[10px]">{table.elapsed}</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 mb-4">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-slate-500">{t('tables.last_activity')}</span>
                                            <span className="font-bold">{t(`tables.activities.${table.activity}`)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500">{t('tables.current_total')}</span>
                                            <span className="font-mono font-bold">{table.total}</span>
                                        </div>
                                    </div>
                                    <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${table.type === 'Available' ? 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50' : 'bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20'}`}>
                                        {table.type === 'Available' ? t('tables.open_order') : t('tables.view_order')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <div className="fixed bottom-0 right-0 left-72 bg-white/90 backdrop-blur-md p-4 flex items-center justify-between border-t border-slate-200">
                    <div className="flex gap-8">
                        <div className="flex flex-col"><span className="text-slate-400 font-bold uppercase text-[10px]">{t('tables.active_tables')}</span><span className="font-bold text-slate-800">14 / 26</span></div>
                        <div className="flex flex-col"><span className="text-slate-400 font-bold uppercase text-[10px]">{t('tables.avg_stay')}</span><span className="font-bold text-slate-800">54 Min</span></div>
                        <div className="flex flex-col"><span className="text-slate-400 font-bold uppercase text-[10px]">{t('tables.kitchen_orders')}</span><span className="font-bold text-slate-800">9 Active</span></div>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white px-6 py-2.5 rounded-xl font-bold text-xs border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">{t('tables.report_issue')}</button>
                        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">{t('tables.shift_summary')}</button>
                    </div>
                </div>
            </main>
        </div>
    );
};
