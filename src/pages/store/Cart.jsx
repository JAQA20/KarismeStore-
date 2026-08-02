import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";

const Cart = () => {
  const {
    cartItems,
    subtotal,
    discountRate,
    discountAmount,
    estimatedTax,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("sinpe");

  // Payment form state
  const [paymentDetails, setPaymentDetails] = useState({
    sinpeRef: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    deliveryAddress: "",
    phone: "",
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const formatColones = (amount) => {
    return `₡${Math.round(amount).toLocaleString("es-CR")}`;
  };

  const handleRemove = (id, name) => {
    removeFromCart(id);
    triggerToast(`"${name}" eliminado de la bolsa.`);
  };

  const handleApplyPromoCode = (e) => {
    e.preventDefault();
    const result = applyCoupon(promoCode);
    triggerToast(result.message);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (selectedPaymentMethod === "sinpe" && !paymentDetails.sinpeRef) {
      triggerToast("Por favor digita el número de comprobante de SINPE Móvil.");
      return;
    }

    setIsCheckoutModalOpen(false);
    setIsOrderConfirmed(true);
  };

  const handleCheckoutConfirm = () => {
    clearCart();
    setIsOrderConfirmed(false);
  };

  // Select 4 recommended products for cross-sell
  const recommendedProducts = products.slice(0, 4);

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12 md:py-16">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm">
          {toastMessage}
        </div>
      )}

      {/* Page Title */}
      <header className="mb-12 border-b border-outline-variant/20 pb-8">
        <h1 className="font-headline-lg text-headline-lg mb-2">Tu Bolsa</h1>
        <p className="font-body-md text-on-surface-variant">
          Revisa tus artículos antes de proceder al pago seguro.
        </p>
      </header>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Product List */}
          <section className="lg:col-span-8">
            <div className="flex flex-col gap-8">
              {cartItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="flex gap-6 group">
                    <Link
                      to={`/product/${item.productId}`}
                      className="w-32 h-44 md:w-40 md:h-56 overflow-hidden bg-surface-container flex-shrink-0 rounded-lg border border-outline-variant/20"
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                    <div className="flex flex-col justify-between py-2 flex-grow">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <Link
                            to={`/product/${item.productId}`}
                            className="hover:text-primary transition-colors"
                          >
                            <h3 className="font-headline-md text-headline-md">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="font-body-lg text-body-lg font-bold text-primary">
                            {formatColones(item.price * item.quantity)}
                          </p>
                        </div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 uppercase tracking-wider">
                          Color: {item.color}
                        </p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Talla: {item.size}
                        </p>
                        <p className="font-label-sm text-xs text-on-surface-variant/60 mt-1 font-mono">
                          Precio unitario: {formatColones(item.price)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-outline-variant rounded-full px-3 py-1 bg-surface-bright">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                            title="Disminuir"
                          >
                            <span className="material-symbols-outlined text-sm">
                              remove
                            </span>
                          </button>
                          <span className="font-body-md text-body-md px-4 font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                            title="Aumentar"
                          >
                            <span className="material-symbols-outlined text-sm">
                              add
                            </span>
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="text-on-surface-variant font-label-sm text-label-sm uppercase hover:text-error transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <div className="h-px bg-outline-variant/30 w-full"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Checkout Summary */}
          <aside className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 sticky top-28">
              <h2 className="font-headline-md text-headline-md mb-8">
                Resumen
              </h2>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between text-on-surface-variant font-body-md">
                  <span>Subtotal</span>
                  <span className="font-bold text-on-surface">
                    {formatColones(subtotal)}
                  </span>
                </div>
                {discountRate > 0 && (
                  <div className="flex justify-between text-primary font-body-md">
                    <span>Descuento ({discountRate * 100}%)</span>
                    <span className="font-bold">
                      -{formatColones(discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant font-body-md">
                  <span>Envío</span>
                  <span className="text-secondary font-medium tracking-wide">
                    GRATIS
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant font-body-md">
                  <span>IVA Estimado (13%)</span>
                  <span>{formatColones(estimatedTax)}</span>
                </div>
                <div className="h-px bg-outline-variant/50 my-2"></div>
                <div className="flex justify-between text-on-surface font-headline-md text-xl">
                  <span>Total</span>
                  <span className="text-primary font-bold">
                    {formatColones(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full bg-on-surface text-on-primary py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary transition-all duration-500 mb-6 cursor-pointer rounded-xl"
              >
                Proceder al Pago
              </button>

              <div className="flex flex-col gap-3 border-t border-b border-outline-variant/20 py-6 my-6">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">
                    verified_user
                  </span>
                  <p className="font-label-sm text-xs uppercase tracking-wider">
                    Pasarela segura (Tilopay / SINPE Móvil)
                  </p>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">
                    local_shipping
                  </span>
                  <p className="font-label-sm text-xs uppercase tracking-wider">
                    Envío gratis por Correos de Costa Rica
                  </p>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">
                    autorenew
                  </span>
                  <p className="font-label-sm text-xs uppercase tracking-wider">
                    Garantía de cambio en 30 días
                  </p>
                </div>
              </div>

              <form onSubmit={handleApplyPromoCode} className="mt-4">
                <p className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  ¿TIENES UN CÓDIGO PROMOCIONAL?
                </p>
                <div className="flex border-b border-outline focus-within:border-primary transition-colors pb-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 font-body-md py-1 px-0 w-full placeholder:text-outline-variant outline-none uppercase text-sm"
                    placeholder="Ej. KARISME10"
                  />
                  <button
                    type="submit"
                    className="font-label-sm text-xs text-primary uppercase cursor-pointer hover:underline font-bold px-2"
                  >
                    Aplicar
                  </button>
                </div>
              </form>
            </div>
          </aside>
        </div>
      ) : (
        <div className="py-20 text-center space-y-6 bg-surface-container-low/30 rounded-2xl border border-outline-variant/20 p-12">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/40">
            shopping_bag
          </span>
          <h2 className="font-headline-lg text-headline-lg">
            Tu bolsa está vacía
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-md mx-auto">
            Descubre nuestra nueva colección y añade tus prendas favoritas a la
            bolsa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              to="/catalog"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
            >
              Colección Mujer
            </Link>
            <Link
              to="/catalog-men"
              className="bg-inverse-surface text-inverse-on-surface px-8 py-4 rounded-full font-label-sm uppercase tracking-widest hover:bg-primary transition-all"
            >
              Colección Hombre
            </Link>
            <Link
              to="/catalog-kids"
              className="bg-[#8c766b] text-white px-8 py-4 rounded-full font-label-sm uppercase tracking-widest hover:bg-[#766258] transition-all"
            >
              Colección Infantil
            </Link>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal (Costa Rica Options) */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-bright rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-outline-variant/30 animate-fade-in my-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/20">
              <div>
                <h3 className="font-headline-md text-headline-md">
                  Pasarela de Pago
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Total a pagar:{" "}
                  <strong className="text-primary font-bold">
                    {formatColones(total)}
                  </strong>
                </p>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleProcessPayment} className="space-y-6">
              {/* Select Payment Gateway */}
              <div>
                <label className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant block mb-3 font-bold">
                  Selecciona el Método de Pago (Costa Rica)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {/* SINPE Móvil Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod("sinpe")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                      selectedPaymentMethod === "sinpe"
                        ? "border-primary bg-primary-container/20 text-primary font-bold shadow-sm"
                        : "border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      phone_iphone
                    </span>
                    <span className="font-label-sm text-xs">SINPE Móvil</span>
                  </button>

                  {/* Tilopay / Credit Card Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod("tilopay")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                      selectedPaymentMethod === "tilopay"
                        ? "border-primary bg-primary-container/20 text-primary font-bold shadow-sm"
                        : "border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      credit_card
                    </span>
                    <span className="font-label-sm text-xs">Tarjeta (Tilopay/BAC)</span>
                  </button>

                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod("contraentrega")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                      selectedPaymentMethod === "contraentrega"
                        ? "border-primary bg-primary-container/20 text-primary font-bold shadow-sm"
                        : "border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      payments
                    </span>
                    <span className="font-label-sm text-xs">Contra Entrega (GAM)</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Method Content */}
              {selectedPaymentMethod === "sinpe" && (
                <div className="bg-surface-container-low p-4 rounded-xl space-y-4 border border-outline-variant/30 text-sm">
                  <div className="flex items-center gap-3 text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      qr_code_2
                    </span>
                    <div>
                      <p className="font-bold">SINPE Móvil Karisme</p>
                      <p className="font-mono text-base text-on-surface">
                        +506 8888-9999
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Realiza la transferencia desde la App de tu banco (BAC, BN, BCR, Wink, Davivienda, etc.) e ingresa el número de comprobante abajo.
                  </p>
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1">
                      Número de Comprobante / Referencia SINPE
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. 20260802998811"
                      value={paymentDetails.sinpeRef}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          sinpeRef: e.target.value,
                        })
                      }
                      className="w-full bg-surface-bright px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              {selectedPaymentMethod === "tilopay" && (
                <div className="bg-surface-container-low p-4 rounded-xl space-y-3 border border-outline-variant/30 text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                      Tarjeta de Crédito / Débito (Tilopay 3DS)
                    </span>
                    <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded font-bold uppercase">
                      Visa / Mastercard / BAC
                    </span>
                  </div>
                  <div>
                    <label className="font-label-sm text-[11px] uppercase text-on-surface-variant block mb-1">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Como aparece en la tarjeta"
                      value={paymentDetails.cardName}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          cardName: e.target.value,
                        })
                      }
                      className="w-full bg-surface-bright px-4 py-2 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-[11px] uppercase text-on-surface-variant block mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4000 1234 5678 9010"
                      value={paymentDetails.cardNumber}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full bg-surface-bright px-4 py-2 rounded-xl border border-outline-variant/50 focus:border-primary outline-none font-mono text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-label-sm text-[11px] uppercase text-on-surface-variant block mb-1">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        value={paymentDetails.cardExpiry}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardExpiry: e.target.value,
                          })
                        }
                        className="w-full bg-surface-bright px-4 py-2 rounded-xl border border-outline-variant/50 focus:border-primary outline-none font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="font-label-sm text-[11px] uppercase text-on-surface-variant block mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="123"
                        value={paymentDetails.cardCvc}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardCvc: e.target.value,
                          })
                        }
                        className="w-full bg-surface-bright px-4 py-2 rounded-xl border border-outline-variant/50 focus:border-primary outline-none font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === "contraentrega" && (
                <div className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-outline-variant/30 text-sm">
                  <p className="font-bold text-primary">Pago al recibir tu paquete</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Válido para entregas dentro de la Gran Área Metropolitana (San José, Heredia, Alajuela, Cartago). Podrás pagar en efectivo o SINPE Móvil al mensajero.
                  </p>
                </div>
              )}

              {/* Shipping Address Inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="font-label-sm text-[11px] uppercase text-on-surface-variant block mb-1 font-bold">
                    Dirección Exacta de Envío (Costa Rica)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. San José, Escazú, 200m Norte del Parque"
                    value={paymentDetails.deliveryAddress}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        deliveryAddress: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-[11px] uppercase text-on-surface-variant block mb-1 font-bold">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+506 8888-0000"
                    value={paymentDetails.phone}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        phone: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm font-mono"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer font-bold"
                >
                  Pagar {formatColones(total)}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="px-5 border border-outline-variant rounded-xl font-label-sm uppercase tracking-wider hover:bg-surface-variant cursor-pointer text-xs"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Checkout Success Confirmation Modal */}
      {isOrderConfirmed && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-bright rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-outline-variant/30 space-y-4 animate-fade-in">
            <span className="material-symbols-outlined text-6xl text-primary">
              task_alt
            </span>
            <h3 className="font-headline-lg text-headline-lg">
              ¡Pedido Procesado con Éxito!
            </h3>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
              Gracias por tu compra en <strong>Karisme Innerwear</strong>. Tu pago por{" "}
              <strong className="text-primary font-bold">{formatColones(total)}</strong> ha sido recibido y registrado bajo el método{" "}
              <span className="uppercase font-bold">
                {selectedPaymentMethod === "sinpe"
                  ? "SINPE Móvil"
                  : selectedPaymentMethod === "tilopay"
                  ? "Tarjeta Tilopay/BAC"
                  : "Pago Contra Entrega"}
              </span>
              .
            </p>
            <p className="text-xs text-on-surface-variant/80 font-mono bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
              Te enviaremos el código de rastreo de Correos de Costa Rica por WhatsApp.
            </p>
            <button
              onClick={handleCheckoutConfirm}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90 cursor-pointer font-bold"
            >
              Volver a la Tienda
            </button>
          </div>
        </div>
      )}

      {/* You Might Also Like Section */}
      <section className="mt-section-gap">
        <h2 className="font-headline-lg text-headline-lg mb-10 text-center">
          También te podría gustar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {recommendedProducts.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <Link
                to={`/product/${item.id}`}
                className="block aspect-[3/4] bg-surface-container-low mb-4 overflow-hidden relative rounded-xl border border-outline-variant/10"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-2 font-label-sm text-xs uppercase tracking-widest text-on-surface hover:bg-on-surface hover:text-white transition-all inline-block rounded-md">
                    Vista Rápida
                  </span>
                </div>
              </Link>
              <div className="text-center">
                <h4 className="font-headline-md text-headline-md mb-1">
                  {item.name}
                </h4>
                <p className="font-body-md text-primary font-bold">
                  {formatColones(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Cart;
