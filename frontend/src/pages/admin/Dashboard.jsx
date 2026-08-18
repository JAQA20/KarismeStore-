import React from 'react';

const Dashboard = () => {
  return (
    <>
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 md:gap-0">
        <div>
          <h2 className="font-headline-lg text-on-surface">Resumen Ejecutivo</h2>
          <p className="font-body-md text-on-surface-variant">Análisis de rendimiento de Karisme Innerwear para el período actual.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-high px-6 py-2 rounded-lg font-label-sm text-on-surface-variant flex items-center gap-2 hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Últimos 30 días
          </button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">download</span>
            Exportar Reporte
          </button>
        </div>
      </header>
      
      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-section-gap">
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-sm text-secondary uppercase tracking-widest">Ventas Totales</span>
            <span className="material-symbols-outlined text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>payments</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-headline-md text-on-surface">$124,500.00</p>
            <span className="text-green-600 font-label-sm flex items-center">+12%</span>
          </div>
          <div className="mt-4 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[75%]"></div>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-sm text-secondary uppercase tracking-widest">Órdenes Nuevas</span>
            <span className="material-symbols-outlined text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>shopping_cart</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-headline-md text-on-surface">1,248</p>
            <span className="text-green-600 font-label-sm flex items-center">+5.4%</span>
          </div>
          <div className="mt-4 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-secondary h-full w-[60%]"></div>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-sm text-secondary uppercase tracking-widest">Ticket Promedio</span>
            <span className="material-symbols-outlined text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>confirmation_number</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-headline-md text-on-surface">$99.76</p>
            <span className="text-red-500 font-label-sm flex items-center">-2.1%</span>
          </div>
          <div className="mt-4 w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-outline h-full w-[45%]"></div>
          </div>
        </div>
      </section>
      
      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-section-gap">
        {/* Sales Trend */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-md p-8 rounded-xl border border-outline-variant/20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-md text-on-surface-variant">Tendencia de Ventas</h3>
            <select className="bg-transparent border-none font-label-sm text-secondary focus:ring-0 outline-none cursor-pointer">
              <option>Mensual</option>
              <option>Semanal</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[40, 55, 45, 70, 60, 85, 95, 80, 65, 75, 90, 100].map((height, i) => (
              <div key={i} className="flex-1 bg-primary-fixed-dim rounded-t-lg transition-all hover:bg-primary" style={{height: `${height}%`}}></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-on-surface-variant opacity-50 uppercase tracking-widest font-label-sm">
            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span>
          </div>
        </div>
        
        {/* Category Distribution */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl border border-outline-variant/20 flex flex-col">
          <h3 className="font-headline-md text-on-surface-variant mb-8">Distribución</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-primary-fixed" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="6"></path>
              <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="45, 100" strokeWidth="6"></path>
              <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="25, 100" strokeWidth="6"></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="font-headline-md text-on-surface">3 Categorías</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="font-label-sm text-on-surface-variant">Mujer</span>
              </div>
              <span className="font-label-sm text-on-surface">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-on-surface-variant">Hombre</span>
              </div>
              <span className="font-label-sm text-on-surface">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-fixed"></span>
                <span className="font-label-sm text-on-surface-variant">Niños</span>
              </div>
              <span className="font-label-sm text-on-surface">30%</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom Grid: Best Sellers & Stock Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter pb-section-gap">
        {/* Best Sellers Table */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl border border-outline-variant/20">
          <h3 className="font-headline-md text-on-surface-variant mb-6">Productos más vendidos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-outline-variant/20">
                <tr>
                  <th className="text-left py-4 font-label-sm text-secondary uppercase tracking-widest">Producto</th>
                  <th className="text-right py-4 font-label-sm text-secondary uppercase tracking-widest">Ventas</th>
                  <th className="text-right py-4 font-label-sm text-secondary uppercase tracking-widest">Ingresos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr>
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-12 bg-surface-container rounded overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHwM0IZw3GPvh6zTWzk1Y4Fpk36vIiRzmcOD2lR7InISDgzpYnTpZDZ9ECpDlN7-es2gP4jqlFXJvu1sw6BAPKYlU4bfS37vgMWjgL6UdVtg2je-lw_rqt8UVEbshMIV9ok-G_YmqUKEqArTrQDYS-60wL7vXM31h5nchCcamqmOH00maCy6xWvgayjDiv2r9JlKRca_2WIw72BUq9u78otq4_GGq9NkGGqLj55WfdMKyZLK8aYTGK" alt="Silk Camisole" />
                    </div>
                    <span className="font-body-md text-on-surface">Silk Camisole</span>
                  </td>
                  <td className="py-4 text-right font-body-md text-on-surface">432</td>
                  <td className="py-4 text-right font-body-md text-on-surface">$21,168</td>
                </tr>
                <tr>
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-12 bg-surface-container rounded overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu742HisX0_-N97O21kuk7YgitBN2Cktst25qPunDQB_T6xzhgiK03w4yr6dnBnxAhxTIDeXmLTscDpY8HBCj4rNShnOvX4PpPwWMTMaPQlKwECwkI_7JcBHzrm_-L6xS3MHcVvZuDWJ3uujiUJE-nWWw-XmoOLnM8_7YpS9lWVTiYgjqfB2NxpuOUQKy1pM_tGeWyuLx3l2h_ny8-sdamQAfnp03G3imCwj4c1SIhKZYElghE3d2v" alt="Lounge Pant" />
                    </div>
                    <span className="font-body-md text-on-surface">Lounge Pant</span>
                  </td>
                  <td className="py-4 text-right font-body-md text-on-surface">389</td>
                  <td className="py-4 text-right font-body-md text-on-surface">$19,061</td>
                </tr>
                <tr>
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-12 bg-surface-container rounded overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBur6FgAzoSV65xBhfMkqj3oBKLjA3FjUdmOSO7ZjfpMpG3A44wBdCSS0pm8clRA2kVVvDAU8BQDzpdJTrjcehlrWIPxCgg0t1nStN5gsulTHR49e1w_-UMS2eJjnXjIjEdYug_0GzEBLbini0uqbE_Jd57bDUH4odtimMITp2LVS5N5dNK7G63jBJipIn2CENDKwbkbClwbQw8azdudphLJnLLx8T68JBTKpeXWoAHguYZTuFiaFN_" alt="Infant Bodysuit" />
                    </div>
                    <span className="font-body-md text-on-surface">Infant Bodysuit</span>
                  </td>
                  <td className="py-4 text-right font-body-md text-on-surface">345</td>
                  <td className="py-4 text-right font-body-md text-on-surface">$8,625</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Stock Alerts */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl border border-outline-variant/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-on-surface-variant">Alertas de Stock</h3>
            <span className="bg-error-container text-on-error-container px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Crítico</span>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-surface-container-low rounded-lg flex items-center justify-between border-l-4 border-error">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-error">warning</span>
                <div>
                  <p className="font-body-md text-on-surface font-medium">Bata de Seda - M</p>
                  <p className="text-[12px] text-on-surface-variant">Solo quedan 3 unidades en inventario.</p>
                </div>
              </div>
              <button className="text-primary font-label-sm underline hover:text-primary-container transition-colors">Reponer</button>
            </div>
            <div className="p-4 bg-surface-container-low rounded-lg flex items-center justify-between border-l-4 border-secondary-fixed-dim">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary">inventory</span>
                <div>
                  <p className="font-body-md text-on-surface font-medium">Top Encaje - S</p>
                  <p className="text-[12px] text-on-surface-variant">12 unidades restantes. Nivel bajo.</p>
                </div>
              </div>
              <button className="text-primary font-label-sm underline hover:text-primary-container transition-colors">Reponer</button>
            </div>
            <div className="p-4 bg-surface-container-low rounded-lg flex items-center justify-between border-l-4 border-secondary-fixed-dim">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary">inventory</span>
                <div>
                  <p className="font-body-md text-on-surface font-medium">Boxer Premium - L</p>
                  <p className="text-[12px] text-on-surface-variant">8 unidades restantes. Nivel bajo.</p>
                </div>
              </div>
              <button className="text-primary font-label-sm underline hover:text-primary-container transition-colors">Reponer</button>
            </div>
          </div>
          <div className="mt-8">
            <p className="font-label-sm text-on-surface-variant mb-4">Uso General de Almacén</p>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[82%]"></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">82% Capacidad</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">1,240 / 1,500 m²</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
