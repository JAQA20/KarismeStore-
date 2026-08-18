import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setToastMessage("¡Gracias por suscribirte a Karisme!");
    setNewsletterEmail("");
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 pt-section-gap pb-12 mt-section-gap relative">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm">
          {toastMessage}
        </div>
      )}

      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
        {/* Brand & Mission */}
        <div className="space-y-6">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <h2 className="font-brand-script text-4xl text-on-surface tracking-normal">
                Karisme
              </h2>
              <span className="material-symbols-outlined text-secondary text-2xl select-none" title="Karisme">
                local_florist
              </span>
            </Link>
            <p className="font-label-sm text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mt-0.5">
              Innerwear
            </p>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Redefiniendo la intimidad a través del diseño minimalista, elegancia
            atemporal y sostenibilidad consciente en Costa Rica.
          </p>
        </div>

        {/* Collections Links */}
        <div>
          <h5 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-6 font-bold">
            Colecciones
          </h5>
          <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
            <li>
              <Link to="/catalog-woman" className="hover:text-primary transition-all">
                Línea Mujer
              </Link>
            </li>
            <li>
              <Link
                to="/catalog-men"
                className="hover:text-primary transition-all"
              >
                Essential Men
              </Link>
            </li>
            <li>
              <Link
                to="/catalog-kids"
                className="hover:text-primary transition-all"
              >
                Colección Infantil
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-primary transition-all">
                Seda Signature
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-primary transition-all">
                Algodón Orgánico
              </Link>
            </li>
          </ul>
        </div>

        {/* Navigation & Help Links */}
        <div>
          <h5 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-6 font-bold">
            Ayuda & Compañía
          </h5>
          <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
            <li>
              <a href="#" className="hover:text-primary transition-all">
                Guía de Tallas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-all">
                Envíos & Devoluciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-all">
                Cuidado de Prendas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-all">
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <Link
                to="/admin"
                className="hover:text-primary transition-all font-bold text-primary"
              >
                Panel Administración
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div className="space-y-6">
          <h5 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface font-bold">
            Newsletter
          </h5>
          <p className="font-body-md text-sm text-on-surface-variant">
            Únete a nuestra comunidad para recibir lanzamientos exclusivos y
            ofertas.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="relative">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="TU CORREO ELECTRÓNICO"
              className="w-full bg-transparent border-b border-outline-variant py-2.5 pr-8 font-label-sm text-xs focus:border-primary transition-colors uppercase outline-none text-on-surface placeholder:text-outline-variant"
            />
            <button
              type="submit"
              className="absolute right-0 bottom-2.5 text-on-surface hover:text-primary transition-colors cursor-pointer"
              title="Suscribirse"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="pt-2">
            <h6 className="font-label-sm text-[11px] uppercase tracking-widest text-on-surface-variant mb-3">
              Síguenos
            </h6>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-outline-variant/40 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-lg">
                  photo_camera
                </span>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-outline-variant/40 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all"
                aria-label="Pinterest"
              >
                <span className="material-symbols-outlined text-lg">movie</span>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-outline-variant/40 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all"
                aria-label="Compartir"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright + Accepted Payment Methods */}
      <div className="border-t border-outline-variant/30 pt-8 pb-4 px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-label-sm text-xs text-on-surface-variant/70 tracking-widest uppercase text-center md:text-left">
          © 2026 KARISME INNERWEAR. TODOS LOS DERECHOS RESERVADOS.
        </p>

        {/* Payment Methods Badges */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant/60 mr-1">
            Métodos Aceptados:
          </span>
          <div className="flex items-center gap-1.5 bg-surface-bright px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-primary">
            <span className="material-symbols-outlined text-sm">
              phone_iphone
            </span>
            SINPE Móvil
          </div>
          <div className="flex items-center gap-1.5 bg-surface-bright px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface">
            <span className="material-symbols-outlined text-sm">
              credit_card
            </span>
            Visa / Mastercard
          </div>
          <div className="flex items-center gap-1.5 bg-surface-bright px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-secondary">
            <span className="material-symbols-outlined text-sm">
              verified_user
            </span>
            Tilopay 3DS
          </div>
          <div className="flex items-center gap-1.5 bg-surface-bright px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">payments</span>
            Contra Entrega
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
