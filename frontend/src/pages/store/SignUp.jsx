import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setToastMessage('Las contraseñas no coinciden.');
      setTimeout(() => setToastMessage(''), 3500);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage('¡Cuenta creada con éxito! Redirigiendo a tu perfil...');
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm">
          {toastMessage}
        </div>
      )}

      {/* Brand Identity Panel (Left - Hidden on Mobile) */}
      <section className="hidden md:flex w-1/2 relative bg-surface-container overflow-hidden items-center justify-center min-h-screen">
        <div className="relative z-10 p-margin-desktop text-center">
          <div className="mb-12">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <h1 className="font-brand-script text-6xl lg:text-7xl text-primary tracking-normal mb-1">
                Karisme
              </h1>
              <p className="font-label-sm text-xs uppercase tracking-[0.4em] text-on-surface-variant">
                Innerwear
              </p>
            </Link>
          </div>
          <div className="max-w-md mx-auto aspect-[3/4] relative editorial-shadow group overflow-hidden rounded-2xl border border-outline-variant/20">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5lHk1e_wHdxjONLTsZkzBBLTX9AtFxyy3HmUZ2KtYrCdK-Wwi92uTBqVvpJCXwYtFbPpUDeF8Md75UZxmPU7HNc7PXr6-dN3p1kQqslaGq_b1DHys0wDuCN08rNqJkMpkbVN3iBL3mfFRD7zSLhNKuqJXwMgsZxMVGMq3sNvRhSkIEoHFO77fQDTOnUKV_M4PMjgi-hf0EAjC7TKwZ3beQOMKkO_nfxycMlR3PRmRibG-9v-lO3it"
              alt="Fashion editorial"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
          </div>
          <p className="mt-12 font-headline-md text-headline-md italic text-primary/80 max-w-sm mx-auto">
            "La elegancia comienza desde el interior."
          </p>
        </div>
      </section>

      {/* Registration Form Panel (Right) */}
      <section className="flex-1 flex items-center justify-center px-margin-mobile md:px-margin-desktop py-12 bg-background relative min-h-screen">
        {/* Mobile Brand Logo */}
        <div className="absolute top-8 left-0 right-0 flex justify-center md:hidden">
          <Link to="/" className="hover:opacity-80 transition-opacity text-center">
            <h1 className="font-brand-script text-4xl text-primary tracking-normal">
              Karisme
            </h1>
          </Link>
        </div>

        <div className="w-full max-w-md animate-fade-in mt-12 md:mt-0">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
              Crear Cuenta
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Únete a nuestra comunidad exclusiva de bienestar y estilo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div className="relative">
              <label
                className="block font-label-sm text-xs uppercase tracking-wider text-on-surface-variant mb-1"
                htmlFor="fullName"
              >
                Nombre Completo
              </label>
              <input
                className="w-full bg-transparent border-b border-secondary-fixed focus:border-primary py-3 px-0 font-body-md text-on-surface outline-none transition-colors"
                id="fullName"
                name="fullName"
                placeholder="Ej. Ana García"
                required
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label
                className="block font-label-sm text-xs uppercase tracking-wider text-on-surface-variant mb-1"
                htmlFor="email"
              >
                Correo Electrónico
              </label>
              <input
                className="w-full bg-transparent border-b border-secondary-fixed focus:border-primary py-3 px-0 font-body-md text-on-surface outline-none transition-colors"
                id="email"
                name="email"
                placeholder="hola@ejemplo.com"
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                className="block font-label-sm text-xs uppercase tracking-wider text-on-surface-variant mb-1"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="w-full bg-transparent border-b border-secondary-fixed focus:border-primary py-3 px-0 font-body-md text-on-surface outline-none transition-colors pr-10"
                  id="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                className="block font-label-sm text-xs uppercase tracking-wider text-on-surface-variant mb-1"
                htmlFor="confirmPassword"
              >
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  className="w-full bg-transparent border-b border-secondary-fixed focus:border-primary py-3 px-0 font-body-md text-on-surface outline-none transition-colors pr-10"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repite tu contraseña"
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 bottom-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="mt-1 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                />
                <span className="font-body-md text-on-surface-variant text-sm group-hover:text-on-surface transition-colors">
                  Deseo recibir actualizaciones sobre nuevas colecciones y ofertas exclusivas.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mt-1 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                />
                <span className="font-body-md text-on-surface-variant text-sm group-hover:text-on-surface transition-colors">
                  Acepto los{' '}
                  <a
                    href="#"
                    className="underline underline-offset-4 decoration-primary-fixed-dim hover:text-primary transition-colors"
                  >
                    Términos y Condiciones
                  </a>{' '}
                  y la{' '}
                  <a
                    href="#"
                    className="underline underline-offset-4 decoration-primary-fixed-dim hover:text-primary transition-colors"
                  >
                    Política de Privacidad
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-on-surface text-background font-label-sm text-xs uppercase tracking-widest py-5 hover:bg-secondary transition-all duration-500 transform hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 cursor-pointer rounded-xl"
            >
              {isSubmitting ? 'Procesando...' : 'Crear Cuenta'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-10 text-center pt-8 border-t border-secondary-fixed/30">
            <p className="font-body-md text-on-surface-variant">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="ml-2 font-label-sm text-xs uppercase tracking-wider text-primary hover:text-on-surface underline underline-offset-8 decoration-primary/30 hover:decoration-primary transition-all"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>

          <div className="mt-12 flex justify-center gap-8">
            <a
              href="#"
              className="text-on-surface-variant/60 hover:text-primary transition-colors"
            >
              <span className="font-label-sm text-[10px] uppercase tracking-widest">
                Instagram
              </span>
            </a>
            <a
              href="#"
              className="text-on-surface-variant/60 hover:text-primary transition-colors"
            >
              <span className="font-label-sm text-[10px] uppercase tracking-widest">
                Pinterest
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
