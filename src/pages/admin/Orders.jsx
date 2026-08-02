import React, { useState } from 'react';

const initialOrders = [
  {
    id: '#ORD-2024-001',
    customer: 'Elena Velázquez',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI8XDyf4Fnlm4LeIQvd5nxY2oP_EcVfPQsvmUtygPJ8WPomoIhMLKDh5r6Rw-BNLUxN_ev3wjvq31lJ54yKXlgyhJpx1Khd3sXwa9ZVtsctywUrTGxIazmFH6t-vIqLWbPe7t8kF67nfaIsu_ldprTmKadbu9lwVsrbnoi138hg1z8ZR-riMBBvTmU0Ksqt9AffosRNqmon8PyY83_qDJ4ePFKBvQHNiLoyI8mwOZnXbaMqBR5tYlX',
    date: '24 Oct, 2023',
    total: '$245.00',
    paymentStatus: 'Pagado',
    shippingStatus: 'Enviado'
  },
  {
    id: '#ORD-2024-002',
    customer: 'Julián Moreno',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNXjg4S0rDGjw9QkUf8pUA_KysdS49yvyIRJf8VSMbPhIiWZPLt2m5P2XhW3F-Iof118wz2JZD9q73dKK_TceJIDhHkj4VI0VcXdqzQnxUUdFDOG_iM8GkfwFwDbTwPcsa4Jlt8Q72_pH54iUi1rHOk1Fe9wlifYxGBbLfCbIW8jT4FQJmFu1T_7IFbMpR7e4sQK7F5hTVRU267NJXisKzX3zc7rBLXX8lfxD4nMeJF6igEUVpZBQS',
    date: '25 Oct, 2023',
    total: '$120.50',
    paymentStatus: 'Pendiente',
    shippingStatus: 'Preparando'
  },
  {
    id: '#ORD-2024-003',
    customer: 'Sofia Loren',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0wD9E02U8WXjveKoWUPsR8nqvV1x-DHRnUB6Mr1w-_BW3Igy5euyo9KjC9TkyHJHRBdoedfKCyEOJJxFnNZAizfbJl8l7P1amm0CZ5UaH_i5syp3wSa0-onND24AgcdGBL1GgCDyFi6F-ih98yVltJwK6YuwMnOJpe4WbvRHrRNAbY-cAAjQvA40zzS0Aq7xA-QJ1em-pPsa2ENVKixKci0L-fvxM_gTZChH-u6RnqpwmFHWF0eno',
    date: '25 Oct, 2023',
    total: '$560.00',
    paymentStatus: 'Pagado',
    shippingStatus: 'Pendiente'
  },
  {
    id: '#ORD-2024-004',
    customer: 'Marco Polo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP5y91I2lu7CIdxpoV6xNJ5rUUI_9QtDxUh4fAUmV4TcXze0-tIb0V04Ss7xEIXUWYA7pvziog9fEjpq1h3KSyJMvHKpUwYU0NxDwUNJk7l0PaUJRYI-T-fGvk-dNdRciaUSu8ITV3ZkYZoW1N2ybW9JIqK09KbbPw1-oKquo68XmIbXPn4mXP-LpxnCjbmMoHdgjwnXcYjvSRncvmOCygNVOOTvDoQX_LaYURaMEuSJXmXQjuSHJo',
    date: '26 Oct, 2023',
    total: '$89.90',
    paymentStatus: 'Pagado',
    shippingStatus: 'Enviado'
  }
];

const Orders = () => {
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const filteredOrders = initialOrders.filter(order => {
    const matchesStatus = filterStatus === 'Todos' || order.shippingStatus === filterStatus;
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm">
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 py-6 px-4 flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h2 className="font-headline-md text-on-surface">Gestión de Órdenes</h2>
          <nav className="flex text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 gap-2 mt-1 font-label-sm">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-primary font-bold">Órdenes</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-variant transition-soft cursor-pointer"
            aria-label="Buscar Orden"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button 
            onClick={() => triggerToast('Exportando archivo CSV de órdenes...')}
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm uppercase tracking-widest hover:bg-primary/90 transition-soft active:scale-95 cursor-pointer"
          >
            Exportar CSV
          </button>
        </div>
      </header>

      {/* Search Input Bar if Toggled */}
      {isSearchOpen && (
        <div className="mb-6 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-primary">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por ID de orden (#ORD-...) o nombre de cliente..."
            className="w-full bg-transparent border-none text-body-md focus:outline-none placeholder:text-on-surface-variant/40"
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-xs text-on-surface-variant hover:text-primary">Limpiar</button>
          )}
        </div>
      )}

      {/* Content Container */}
      <div className="py-2 max-w-container-max mx-auto flex-1">
        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="font-label-sm text-on-surface-variant/80 uppercase tracking-widest mr-2 text-xs">Filtrar por Envío:</span>
          {['Todos', 'Pendiente', 'Preparando', 'Enviado'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-5 py-2 rounded-full font-label-sm uppercase tracking-tighter transition-soft cursor-pointer ${
                filterStatus === status 
                  ? 'bg-primary text-on-primary shadow-md font-bold' 
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-primary-container/40'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders Table Container */}
        <div className="bg-surface-bright rounded-2xl editorial-shadow overflow-hidden border border-outline-variant/20">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant/30">
                  <th className="px-6 py-5 font-label-sm text-on-surface-variant uppercase tracking-widest">ID Orden</th>
                  <th className="px-6 py-5 font-label-sm text-on-surface-variant uppercase tracking-widest">Cliente</th>
                  <th className="px-6 py-5 font-label-sm text-on-surface-variant uppercase tracking-widest">Fecha</th>
                  <th className="px-6 py-5 font-label-sm text-on-surface-variant uppercase tracking-widest">Total</th>
                  <th className="px-6 py-5 font-label-sm text-on-surface-variant uppercase tracking-widest">Estado de Pago</th>
                  <th className="px-6 py-5 font-label-sm text-on-surface-variant uppercase tracking-widest">Estado de Envío</th>
                  <th className="px-6 py-5 font-label-sm text-on-surface-variant uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-surface-container-lowest/50 transition-colors group">
                      <td className="px-6 py-6 font-medium text-on-surface">{order.id}</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary-fixed">
                            <img className="w-full h-full object-cover" src={order.avatar} alt={order.customer} />
                          </div>
                          <span className="font-body-md text-on-surface">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-on-surface-variant">{order.date}</td>
                      <td className="px-6 py-6 font-bold text-on-surface">{order.total}</td>
                      <td className="px-6 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm uppercase tracking-tighter ${
                          order.paymentStatus === 'Pagado'
                            ? 'bg-primary-container text-primary'
                            : 'bg-error-container text-error'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${order.paymentStatus === 'Pagado' ? 'bg-primary' : 'bg-error'}`}></span>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm uppercase tracking-tighter ${
                          order.shippingStatus === 'Enviado' 
                            ? 'bg-tertiary-container text-tertiary'
                            : 'bg-surface-variant text-on-surface-variant'
                        }`}>
                          {order.shippingStatus}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="text-primary font-bold font-label-sm uppercase tracking-widest hover:underline transition-all cursor-pointer"
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-on-surface-variant font-body-md">
                      No se encontraron órdenes para el filtro seleccionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination/Footer */}
          <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between">
            <p className="font-label-sm text-on-surface-variant tracking-tighter">Mostrando {filteredOrders.length} de {initialOrders.length} órdenes</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-variant transition-soft">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-on-primary font-label-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-variant transition-soft font-label-sm">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-variant transition-soft">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-bright rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-outline-variant/30 animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-headline-md text-on-surface">{selectedOrder.id}</h3>
                  <p className="font-body-md text-on-surface-variant text-sm">Cliente: {selectedOrder.customer}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-on-surface-variant hover:text-primary">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="space-y-3 mb-8 border-y border-outline-variant/20 py-4 text-sm font-body-md">
                <div className="flex justify-between"><span>Fecha:</span> <span className="font-bold">{selectedOrder.date}</span></div>
                <div className="flex justify-between"><span>Total:</span> <span className="font-bold text-primary">{selectedOrder.total}</span></div>
                <div className="flex justify-between"><span>Estado de Pago:</span> <span className="font-bold">{selectedOrder.paymentStatus}</span></div>
                <div className="flex justify-between"><span>Estado de Envío:</span> <span className="font-bold">{selectedOrder.shippingStatus}</span></div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    triggerToast(`Orden ${selectedOrder.id} actualizada`);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90"
                >
                  Marcar como Enviado
                </button>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 border border-outline-variant py-3 rounded-xl font-label-sm uppercase tracking-wider hover:bg-surface-variant"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-10">
          <div className="p-6 bg-surface-bright border border-outline-variant/30 rounded-2xl editorial-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-primary text-[28px]">local_shipping</span>
              <span className="text-[10px] text-primary font-bold bg-primary-container px-2 py-1 rounded-full">ALTO FLUJO</span>
            </div>
            <h4 className="font-label-sm uppercase tracking-widest text-on-surface-variant/60">Envíos del día</h4>
            <p className="font-headline-md text-on-surface mt-1">42 Pedidos</p>
          </div>
          <div className="p-6 bg-surface-bright border border-outline-variant/30 rounded-2xl editorial-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-secondary text-[28px]">pending_actions</span>
            </div>
            <h4 className="font-label-sm uppercase tracking-widest text-on-surface-variant/60">Pendientes de Pago</h4>
            <p className="font-headline-md text-on-surface mt-1">12 Pedidos</p>
          </div>
          <div className="p-6 bg-surface-bright border border-outline-variant/30 rounded-2xl editorial-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-tertiary text-[28px]">hourglass_empty</span>
            </div>
            <h4 className="font-label-sm uppercase tracking-widest text-on-surface-variant/60">Tiempo Medio Prep.</h4>
            <p className="font-headline-md text-on-surface mt-1">4.5 Horas</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
