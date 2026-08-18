import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage('¡Sesión iniciada con éxito!');
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen relative flex flex-col justify-between">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm">
          {toastMessage}
        </div>
      )}

      {/* Top Branding Anchor */}
      <header className="w-full flex justify-center py-10 z-10">
        <Link to="/" className="hover:opacity-80 transition-opacity text-center">
          <h1 className="font-brand-script text-5xl md:text-6xl text-primary tracking-normal">
            Karisme
          </h1>
          <p className="font-label-sm text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
            Innerwear
          </p>
        </Link>
      </header>

      {/* Main Form Box */}
      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-8 z-10">
        <div className="w-full max-w-[480px] animate-fade-in bg-surface-bright/80 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-outline-variant/30 shadow-sm">
          {/* Hero Heading */}
          <div className="text-center mb-10">
            <h2 className="font-headline-lg text-headline-lg mb-3 text-on-surface">
              Bienvenido de Nuevo
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-[320px] mx-auto">
              Accede a tu espacio personal de confort y elegancia.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div className="relative">
              <label
                className="block font-label-sm text-xs uppercase tracking-wider text-on-surface-variant mb-2"
                htmlFor="login-email"
              >
                Correo Electrónico
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@ejemplo.com"
                className="w-full bg-transparent border-b border-secondary-fixed focus:border-primary py-3 px-0 font-body-md text-on-surface placeholder:text-outline-variant/50 outline-none transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="flex justify-between items-end mb-2">
                <label
                  className="block font-label-sm text-xs uppercase tracking-wider text-on-surface-variant"
                  htmlFor="login-password"
                >
                  Contraseña
                </label>
                <a
                  href="#"
                  className="font-label-sm text-xs uppercase text-primary hover:text-on-primary-fixed-variant transition-colors duration-300"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-secondary-fixed focus:border-primary py-3 px-0 font-body-md text-on-surface placeholder:text-outline-variant/50 outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-on-surface text-on-primary font-label-sm text-xs uppercase tracking-widest py-5 px-8 hover:bg-secondary transition-all duration-500 transform hover:scale-[1.01] active:opacity-70 rounded-xl cursor-pointer"
            >
              {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="mt-10 text-center pt-6 border-t border-outline-variant/20">
            <p className="font-body-md text-on-surface-variant mb-3">
              ¿No tienes una cuenta aún?
            </p>
            <Link
              to="/signup"
              className="inline-block font-label-sm text-xs uppercase border-b border-primary text-primary pb-1 hover:text-on-primary-fixed-variant hover:border-on-primary-fixed-variant transition-all duration-300 font-bold tracking-wider"
            >
              Crear una cuenta
            </Link>
          </div>
        </div>
      </main>

      {/* Ambient Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -ml-48 -mb-48 pointer-events-none z-0"></div>

      {/* Minimal Footer */}
      <footer className="w-full py-6 text-center px-margin-mobile z-10">
        <p className="font-label-sm text-[10px] text-on-surface-variant/40 tracking-[0.2em] uppercase">
          © 2024 Karisme Innerwear. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Login;
