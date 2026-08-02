import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const provinciasCostaRica = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
];

const initialPaymentMethods = [
  {
    id: '1',
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiry: '08/28',
    holder: 'Sofia Loren Castellanos',
    isDefault: true,
  },
  {
    id: '2',
    type: 'sinpe',
    phone: '+506 8888-9999',
    holder: 'Sofia Loren Castellanos',
    isDefault: false,
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState('card');
  const [newCardData, setNewCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    sinpePhone: '',
  });

  const [userInfo, setUserInfo] = useState({
    fullName: 'Sofia Loren Castellanos',
    email: 'sofia.loren@lifestyle.com',
    phone: '+506 8888 9999',
    password: '••••••••••••',
  });

  const [shippingAddress, setShippingAddress] = useState({
    provincia: 'San José',
    canton: 'Escazú',
    distrito: 'Escazú Centro',
    direccionExacta: 'De la iglesia parroquial, 200m Norte y 50m Este, casa #45 color beige.',
    indicacionesAdicionales: 'Portón negro automático. Si no responden, llamar previamente al teléfono de contacto.',
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    triggerToast('Has cerrado sesión correctamente.');
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setIsEditingInfo(false);
    triggerToast('Información personal actualizada con éxito.');
  };

  const handleSaveShipping = (e) => {
    e.preventDefault();
    setIsEditingShipping(false);
    triggerToast('Información de envío guardada con éxito.');
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
    triggerToast('Método de pago predeterminado actualizado.');
  };

  const handleDeletePayment = (id) => {
    setPaymentMethods((prev) => prev.filter((item) => item.id !== id));
    triggerToast('Método de pago eliminado.');
  };

  const handleAddPaymentSubmit = (e) => {
    e.preventDefault();
    if (newPaymentType === 'card') {
      if (!newCardData.cardNumber || !newCardData.cardHolder || !newCardData.expiry) {
        triggerToast('Por favor completa todos los campos de la tarjeta.');
        return;
      }
      const newMethod = {
        id: Date.now().toString(),
        type: 'card',
        brand: newCardData.cardNumber.startsWith('5') ? 'Mastercard' : 'Visa',
        last4: newCardData.cardNumber.slice(-4) || '1111',
        expiry: newCardData.expiry,
        holder: newCardData.cardHolder,
        isDefault: paymentMethods.length === 0,
      };
      setPaymentMethods([newMethod, ...paymentMethods]);
      triggerToast('¡Tarjeta agregada correctamente!');
    } else {
      if (!newCardData.sinpePhone) {
        triggerToast('Por favor ingresa el número de teléfono SINPE Móvil.');
        return;
      }
      const newMethod = {
        id: Date.now().toString(),
        type: 'sinpe',
        phone: newCardData.sinpePhone,
        holder: userInfo.fullName,
        isDefault: paymentMethods.length === 0,
      };
      setPaymentMethods([newMethod, ...paymentMethods]);
      triggerToast('¡Número SINPE Móvil guardado!');
    }

    setIsAddPaymentModalOpen(false);
    setNewCardData({ cardNumber: '', cardHolder: '', expiry: '', sinpePhone: '' });
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm">
          {toastMessage}
        </div>
      )}

      {/* Main Profile Layout */}
      <main className="py-12 md:py-16 px-margin-desktop max-w-container-max mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row gap-gutter">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-1/4 space-y-8 animate-fade-in">
            <div className="space-y-2">
              <p className="font-label-sm text-xs text-outline tracking-[0.2em] uppercase">
                Bienvenida de nuevo,
              </p>
              <h2 className="font-headline-lg text-headline-lg">
                {userInfo.fullName.split(' ')[0]} Loren
              </h2>
            </div>

            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center space-x-3 transition-all duration-300 py-3 pl-4 border-l-2 text-left cursor-pointer ${
                  activeTab === 'account'
                    ? 'text-primary font-bold border-primary bg-primary-container/20 rounded-r-xl'
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
              >
                <span className="material-symbols-outlined">account_circle</span>
                <span className="font-body-md">Mi Cuenta</span>
              </button>

              <button
                onClick={() => setActiveTab('shipping')}
                className={`flex items-center space-x-3 transition-all duration-300 py-3 pl-4 border-l-2 text-left cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'text-primary font-bold border-primary bg-primary-container/20 rounded-r-xl'
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
              >
                <span className="material-symbols-outlined">local_shipping</span>
                <span className="font-body-md">Información de Envío</span>
              </button>

              <button
                onClick={() => setActiveTab('payments')}
                className={`flex items-center space-x-3 transition-all duration-300 py-3 pl-4 border-l-2 text-left cursor-pointer ${
                  activeTab === 'payments'
                    ? 'text-primary font-bold border-primary bg-primary-container/20 rounded-r-xl'
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
              >
                <span className="material-symbols-outlined">credit_card</span>
                <span className="font-body-md">Métodos de Pago</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-3 transition-all duration-300 py-3 pl-4 border-l-2 text-left cursor-pointer ${
                  activeTab === 'orders'
                    ? 'text-primary font-bold border-primary bg-primary-container/20 rounded-r-xl'
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
              >
                <span className="material-symbols-outlined">inventory_2</span>
                <span className="font-body-md">Mis Pedidos</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center space-x-3 transition-all duration-300 py-3 pl-4 border-l-2 text-left cursor-pointer ${
                  activeTab === 'wishlist'
                    ? 'text-primary font-bold border-primary bg-primary-container/20 rounded-r-xl'
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
              >
                <span className="material-symbols-outlined">favorite</span>
                <span className="font-body-md">Lista de Deseos</span>
              </button>

              <hr className="border-outline-variant/30 my-2" />

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 text-on-surface-variant hover:text-error transition-all duration-300 py-3 pl-4 text-left cursor-pointer w-full"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-body-md">Cerrar Sesión</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <section className="w-full md:w-3/4 space-y-12 animate-fade-in">
            {/* TAB: ACCOUNT OR SHIPPING */}
            {(activeTab === 'account' || activeTab === 'shipping') && (
              <>
                {/* Personal Info Card */}
                {activeTab === 'account' && (
                  <div className="bg-surface-container-low p-8 md:p-12 editorial-shadow border border-outline-variant/30 rounded-2xl">
                    <div className="flex justify-between items-end mb-10">
                      <div>
                        <h3 className="font-headline-md text-headline-md mb-2">
                          Información Personal
                        </h3>
                        <p className="text-on-surface-variant font-body-md max-w-md">
                          Gestiona tus datos de contacto y contraseña para mantener tu cuenta actualizada.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsEditingInfo(!isEditingInfo)}
                        className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-all duration-500 font-label-sm uppercase tracking-widest text-xs rounded-xl cursor-pointer"
                      >
                        {isEditingInfo ? 'Cancelar' : 'Editar'}
                      </button>
                    </div>

                    {isEditingInfo ? (
                      <form onSubmit={handleSaveInfo} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="font-label-sm text-xs text-outline tracking-wider uppercase block mb-2">
                              Nombre Completo
                            </label>
                            <input
                              type="text"
                              value={userInfo.fullName}
                              onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                              className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 font-body-lg text-on-surface outline-none focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="font-label-sm text-xs text-outline tracking-wider uppercase block mb-2">
                              Correo Electrónico
                            </label>
                            <input
                              type="email"
                              value={userInfo.email}
                              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                              className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 font-body-lg text-on-surface outline-none focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="font-label-sm text-xs text-outline tracking-wider uppercase block mb-2">
                              Teléfono
                            </label>
                            <input
                              type="text"
                              value={userInfo.phone}
                              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                              className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 font-body-lg text-on-surface outline-none focus:border-primary font-mono"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-sm text-xs uppercase tracking-widest hover:bg-primary/90 cursor-pointer"
                        >
                          Guardar Cambios
                        </button>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-1">
                          <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                            Nombre Completo
                          </label>
                          <div className="py-3 border-b border-outline-variant font-body-lg">
                            {userInfo.fullName}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                            Correo Electrónico
                          </label>
                          <div className="py-3 border-b border-outline-variant font-body-lg">
                            {userInfo.email}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                            Teléfono
                          </label>
                          <div className="py-3 border-b border-outline-variant font-body-lg font-mono">
                            {userInfo.phone}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                            Contraseña
                          </label>
                          <div className="py-3 border-b border-outline-variant font-body-lg">
                            {userInfo.password}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Shipping Information Card */}
                <div className="bg-surface-container-low p-8 md:p-12 editorial-shadow border border-outline-variant/30 rounded-2xl">
                  <div className="flex justify-between items-end mb-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary text-3xl">
                          local_shipping
                        </span>
                        <h3 className="font-headline-md text-headline-md">
                          Información de Envío (Costa Rica)
                        </h3>
                      </div>
                      <p className="text-on-surface-variant font-body-md max-w-lg">
                        Tu dirección habitual para entregas mediante Correos de Costa Rica o mensajería privada.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditingShipping(!isEditingShipping)}
                      className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-all duration-500 font-label-sm uppercase tracking-widest text-xs rounded-xl cursor-pointer"
                    >
                      {isEditingShipping ? 'Cancelar' : 'Editar Dirección'}
                    </button>
                  </div>

                  {isEditingShipping ? (
                    <form onSubmit={handleSaveShipping} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Provincia */}
                        <div>
                          <label className="font-label-sm text-xs text-outline tracking-wider uppercase block mb-2 font-bold">
                            Provincia
                          </label>
                          <select
                            value={shippingAddress.provincia}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, provincia: e.target.value })
                            }
                            className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 font-body-lg text-on-surface outline-none focus:border-primary cursor-pointer"
                          >
                            {provinciasCostaRica.map((prov) => (
                              <option key={prov} value={prov}>
                                {prov}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Cantón */}
                        <div>
                          <label className="font-label-sm text-xs text-outline tracking-wider uppercase block mb-2 font-bold">
                            Cantón
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Escazú, Montes de Oca"
                            value={shippingAddress.canton}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, canton: e.target.value })
                            }
                            className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 font-body-lg text-on-surface outline-none focus:border-primary"
                          />
                        </div>

                        {/* Distrito */}
                        <div>
                          <label className="font-label-sm text-xs text-outline tracking-wider uppercase block mb-2 font-bold">
                            Distrito
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Escazú Centro, San Pedro"
                            value={shippingAddress.distrito}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, distrito: e.target.value })
                            }
                            className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 font-body-lg text-on-surface outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Dirección Exacta */}
                      <div>
                        <label className="font-label-sm text-xs text-outline tracking-wider uppercase block mb-2 font-bold">
                          Dirección Exacta
                        </label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Calle, número de casa, color, puntos de referencia conocidos..."
                          value={shippingAddress.direccionExacta}
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              direccionExacta: e.target.value,
                            })
                          }
                          className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 font-body-lg text-on-surface outline-none focus:border-primary"
                        ></textarea>
                      </div>

                      {/* Indicaciones Adicionales */}
                      <div>
                        <label className="font-label-sm text-xs text-outline tracking-wider uppercase block mb-2 font-bold">
                          Indicaciones Adicionales para Entrega
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Ej. Entregar en recepción del edificio, llamar 10 min antes, timbrar en portón negro..."
                          value={shippingAddress.indicacionesAdicionales}
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              indicacionesAdicionales: e.target.value,
                            })
                          }
                          className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 font-body-lg text-on-surface outline-none focus:border-primary"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-sm text-xs uppercase tracking-widest hover:bg-primary/90 cursor-pointer font-bold"
                      >
                        Guardar Dirección de Envío
                      </button>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                          Provincia
                        </label>
                        <div className="py-3 border-b border-outline-variant font-body-lg font-bold text-primary">
                          {shippingAddress.provincia}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                          Cantón
                        </label>
                        <div className="py-3 border-b border-outline-variant font-body-lg">
                          {shippingAddress.canton}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                          Distrito
                        </label>
                        <div className="py-3 border-b border-outline-variant font-body-lg">
                          {shippingAddress.distrito}
                        </div>
                      </div>
                      <div className="space-y-1 md:col-span-3 mt-4">
                        <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                          Dirección Exacta
                        </label>
                        <div className="py-3 border-b border-outline-variant font-body-lg text-on-surface leading-relaxed">
                          {shippingAddress.direccionExacta}
                        </div>
                      </div>
                      <div className="space-y-1 md:col-span-3 mt-4">
                        <label className="font-label-sm text-xs text-outline tracking-wider uppercase">
                          Indicaciones Adicionales
                        </label>
                        <div className="py-3 border-b border-outline-variant font-body-lg text-on-surface-variant italic">
                          "{shippingAddress.indicacionesAdicionales}"
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="bg-surface-container-low p-8 md:p-12 editorial-shadow border border-outline-variant/30 rounded-2xl space-y-8">
                <div className="flex justify-between items-end pb-6 border-b border-outline-variant/30">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-primary text-3xl">
                        credit_card
                      </span>
                      <h3 className="font-headline-md text-headline-md">
                        Métodos de Pago Guardados
                      </h3>
                    </div>
                    <p className="text-on-surface-variant font-body-md max-w-lg">
                      Administra tus tarjetas de crédito/débito activas y cuentas SINPE Móvil para pagos rápidos.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddPaymentModalOpen(true)}
                    className="px-6 py-3 bg-primary text-on-primary font-label-sm text-xs uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all cursor-pointer font-bold flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Añadir Método
                  </button>
                </div>

                {/* List of Saved Payment Methods */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative ${
                        method.isDefault
                          ? 'border-primary bg-primary-container/20 shadow-sm'
                          : 'border-outline-variant/30 bg-surface-bright hover:border-primary/40'
                      }`}
                    >
                      {method.isDefault && (
                        <span className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Predeterminado
                        </span>
                      )}

                      <div>
                        {method.type === 'card' ? (
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <span className="material-symbols-outlined text-3xl text-primary">
                                credit_card
                              </span>
                              <div>
                                <h4 className="font-bold text-base">{method.brand}</h4>
                                <p className="text-xs text-on-surface-variant">Tarjeta de Crédito / Débito</p>
                              </div>
                            </div>
                            <p className="font-mono text-lg tracking-widest text-on-surface mb-2">
                              •••• •••• •••• {method.last4}
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              Titular: <strong>{method.holder}</strong>
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              Vence: <strong>{method.expiry}</strong>
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <span className="material-symbols-outlined text-3xl text-secondary">
                                phone_iphone
                              </span>
                              <div>
                                <h4 className="font-bold text-base">SINPE Móvil</h4>
                                <p className="text-xs text-on-surface-variant">Cuenta Asociada Costa Rica</p>
                              </div>
                            </div>
                            <p className="font-mono text-lg font-bold text-on-surface mb-2">
                              {method.phone}
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              Titular: <strong>{method.holder}</strong>
                            </p>
                          </>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/20">
                        {!method.isDefault ? (
                          <button
                            onClick={() => handleSetDefaultPayment(method.id)}
                            className="text-xs text-primary font-bold uppercase tracking-wider hover:underline cursor-pointer"
                          >
                            Usar como principal
                          </button>
                        ) : (
                          <span className="text-xs text-secondary font-bold">Activo para compras</span>
                        )}

                        <button
                          onClick={() => handleDeletePayment(method.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1 cursor-pointer"
                          title="Eliminar método"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-headline-md text-headline-md">Mis Pedidos</h3>
                </div>
                <div className="space-y-4">
                  {/* Order Row 1 */}
                  <div className="flex flex-col md:flex-row items-center bg-surface border border-outline-variant/20 p-4 md:p-6 hover:border-primary/40 transition-colors group rounded-2xl">
                    <div className="w-24 h-32 bg-surface-container-highest overflow-hidden mb-4 md:mb-0 md:mr-8 rounded-xl shrink-0">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCR_APtiQ0AIi6HxuZIYXTj0e2ZE76XBTUPVxuDOEhC4XumZiqELqZS8I9Ny2qmyHhj8QNTunDKfPMutH6ykxgglWoRCLtdBmTVtAvLc_HJA6Dn4-7Ix6n2tu_vd-FMFvbspeeFC9nfd_WTjPD3ZBKYGXL0SBYBO755_VXtkBjiSTI9UY-RQVIb6oVFprUdMd8xRGUX8mv7rYe0WFf6kFr2aPjmQkClg86IV_hdWsdGXImykDtCQms"
                        alt="Camisola de Seda Rose"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-center md:text-left">
                      <div className="space-y-1">
                        <p className="font-label-sm text-outline uppercase text-[10px]">Pedido</p>
                        <p className="font-body-md font-bold">#KS-88291</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-label-sm text-outline uppercase text-[10px]">Fecha</p>
                        <p className="font-body-md">12 Nov, 2024</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-label-sm text-outline uppercase text-[10px]">Estado</p>
                        <span className="inline-block px-2 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase tracking-widest rounded">
                          Enviado
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-label-sm text-outline uppercase text-[10px]">Total</p>
                        <p className="font-body-md font-bold text-primary">₡75.000</p>
                      </div>
                    </div>
                    <button
                      onClick={() => triggerToast('Detalles del pedido #KS-88291')}
                      className="mt-4 md:mt-0 px-6 py-2 bg-on-surface text-surface text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors rounded-xl cursor-pointer"
                    >
                      Detalles
                    </button>
                  </div>

                  {/* Order Row 2 */}
                  <div className="flex flex-col md:flex-row items-center bg-surface border border-outline-variant/20 p-4 md:p-6 hover:border-primary/40 transition-colors group rounded-2xl">
                    <div className="w-24 h-32 bg-surface-container-highest overflow-hidden mb-4 md:mb-0 md:mr-8 rounded-xl shrink-0">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQtKEKicSdGwItrl0sOATnH5adZeXXFCb5IoSNtGU3NblB2lzVJ2vo_WQNm51Kj8ZZEp9wTxcIoZKiHlpbuItiMEQ2Q7sl1NIG0qfuGHDh3fI3eQM5kZv-ptd4FSL8PVKZBRKQrPwhr1HY4EGgNb_Xa_6aAi-h9T3Fi90yy5GqhO50fJ04bWGJ8SaD51HD-OrpwCA_8_7ILamBZs8LS2nM9ThM_h_AIyKRSmBJnpT3c4xNA5hESzgR"
                        alt="Boxer Algodón Hombre"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-center md:text-left">
                      <div className="space-y-1">
                        <p className="font-label-sm text-outline uppercase text-[10px]">Pedido</p>
                        <p className="font-body-md font-bold">#KS-87450</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-label-sm text-outline uppercase text-[10px]">Fecha</p>
                        <p className="font-body-md">28 Oct, 2024</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-label-sm text-outline uppercase text-[10px]">Estado</p>
                        <span className="inline-block px-2 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest rounded">
                          Entregado
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-label-sm text-outline uppercase text-[10px]">Total</p>
                        <p className="font-body-md font-bold text-primary">₡46.000</p>
                      </div>
                    </div>
                    <button
                      onClick={() => triggerToast('Detalles del pedido #KS-87450')}
                      className="mt-4 md:mt-0 px-6 py-2 bg-on-surface text-surface text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors rounded-xl cursor-pointer"
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-8">
                <h3 className="font-headline-md text-headline-md">Lista de Deseos</h3>
                <p className="text-on-surface-variant font-body-md">
                  Guarda tus artículos favoritos para comprarlos más tarde.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface border border-outline-variant/20 p-4 rounded-2xl flex gap-4 items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCR_APtiQ0AIi6HxuZIYXTj0e2ZE76XBTUPVxuDOEhC4XumZiqELqZS8I9Ny2qmyHhj8QNTunDKfPMutH6ykxgglWoRCLtdBmTVtAvLc_HJA6Dn4-7Ix6n2tu_vd-FMFvbspeeFC9nfd_WTjPD3ZBKYGXL0SBYBO755_VXtkBjiSTI9UY-RQVIb6oVFprUdMd8xRGUX8mv7rYe0WFf6kFr2aPjmQkClg86IV_hdWsdGXImykDtCQms"
                      alt="Fav"
                      className="w-20 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-bold text-base">Camisola Silk Rose</h4>
                      <p className="text-primary font-bold text-sm">₡45.000</p>
                      <Link
                        to="/product/1"
                        className="inline-block mt-2 text-xs uppercase font-label-sm text-primary underline"
                      >
                        Ver Producto
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Size Preferences Section */}
            {activeTab === 'account' && (
              <div className="space-y-8">
                <h3 className="font-headline-md text-headline-md">Preferencia de Tallas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Woman Preference */}
                  <div className="group cursor-pointer bg-tertiary-container/30 p-6 transition-all duration-500 hover:bg-primary-container/50 rounded-2xl border border-outline-variant/20">
                    <div className="flex justify-between items-start mb-6">
                      <span className="material-symbols-outlined text-4xl text-primary">woman</span>
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">edit</span>
                    </div>
                    <h4 className="font-body-lg font-bold mb-1">Mujer</h4>
                    <p className="text-on-surface-variant text-sm mb-4">Ajuste Editorial & Seda</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white text-[10px] font-bold uppercase tracking-widest border border-outline-variant rounded-md">Top: S</span>
                      <span className="px-3 py-1 bg-white text-[10px] font-bold uppercase tracking-widest border border-outline-variant rounded-md">Bottom: 36</span>
                    </div>
                  </div>

                  {/* Man Preference */}
                  <div className="group cursor-pointer bg-surface-container-high p-6 transition-all duration-500 hover:bg-secondary-container/50 rounded-2xl border border-outline-variant/20">
                    <div className="flex justify-between items-start mb-6">
                      <span className="material-symbols-outlined text-4xl text-secondary">man</span>
                      <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">add_circle</span>
                    </div>
                    <h4 className="font-body-lg font-bold mb-1">Hombre</h4>
                    <p className="text-on-surface-variant text-sm mb-4">No configurado aún</p>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary underline">Configurar tallas</div>
                  </div>

                  {/* Child Preference */}
                  <div className="group cursor-pointer bg-surface-container-high p-6 transition-all duration-500 hover:bg-tertiary-container rounded-2xl border border-outline-variant/20">
                    <div className="flex justify-between items-start mb-6">
                      <span className="material-symbols-outlined text-4xl text-tertiary">child_care</span>
                      <span className="material-symbols-outlined text-outline group-hover:text-tertiary transition-colors">add_circle</span>
                    </div>
                    <h4 className="font-body-lg font-bold mb-1">Infantil</h4>
                    <p className="text-on-surface-variant text-sm mb-4">Algodón Orgánico</p>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-tertiary underline">Configurar tallas</div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Add Payment Method Modal */}
      {isAddPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-bright rounded-2xl p-8 max-w-md w-full shadow-2xl border border-outline-variant/30 space-y-6 animate-fade-in">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-headline-md">Añadir Método de Pago</h3>
              <button
                onClick={() => setIsAddPaymentModalOpen(false)}
                className="text-on-surface-variant hover:text-error cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddPaymentSubmit} className="space-y-4">
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setNewPaymentType('card')}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    newPaymentType === 'card'
                      ? 'border-primary bg-primary-container/30 text-primary'
                      : 'border-outline-variant/40 text-on-surface-variant'
                  }`}
                >
                  Tarjeta Crédito/Débito
                </button>
                <button
                  type="button"
                  onClick={() => setNewPaymentType('sinpe')}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    newPaymentType === 'sinpe'
                      ? 'border-primary bg-primary-container/30 text-primary'
                      : 'border-outline-variant/40 text-on-surface-variant'
                  }`}
                >
                  SINPE Móvil
                </button>
              </div>

              {newPaymentType === 'card' ? (
                <>
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1 font-bold">
                      Nombre del Titular
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Como figura en la tarjeta"
                      value={newCardData.cardHolder}
                      onChange={(e) => setNewCardData({ ...newCardData, cardHolder: e.target.value })}
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1 font-bold">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4000 1234 5678 9010"
                      value={newCardData.cardNumber}
                      onChange={(e) => setNewCardData({ ...newCardData, cardNumber: e.target.value })}
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1 font-bold">
                      Vencimiento (MM/AA)
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="08/28"
                      value={newCardData.expiry}
                      onChange={(e) => setNewCardData({ ...newCardData, expiry: e.target.value })}
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none font-mono text-sm"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1 font-bold">
                    Número de Teléfono SINPE Móvil
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+506 8888-9999"
                    value={newCardData.sinpePhone}
                    onChange={(e) => setNewCardData({ ...newCardData, sinpePhone: e.target.value })}
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none font-mono text-sm"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3.5 rounded-xl font-label-sm uppercase tracking-wider text-xs font-bold hover:bg-primary/90 cursor-pointer"
                >
                  Guardar Método
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddPaymentModalOpen(false)}
                  className="px-5 border border-outline-variant rounded-xl font-label-sm uppercase tracking-wider text-xs hover:bg-surface-variant cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
