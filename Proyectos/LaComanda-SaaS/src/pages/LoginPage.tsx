import React, { useState } from "react";

interface LoginPageProps {
  onLogin: (role: "WAITER" | "KITCHEN" | "MANAGER") => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [role, setRole] = useState<"WAITER" | "KITCHEN" | "MANAGER">("WAITER");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="culinary-texture min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop w-full">
      <main className="w-full max-w-[440px] flex flex-col gap-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span
              className="material-symbols-outlined text-on-primary text-4xl"
              data-icon="restaurant_menu"
            >
              restaurant_menu
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            La Comanda
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Restaurant Management Suite
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest border border-surface-variant/20 rounded-xl p-8 shadow-[0_12px_24px_rgba(26,28,27,0.08)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Role Selector (Bento Style Toggle) */}
            <div className="flex flex-col gap-3">
              <label className="font-label-bold text-label-bold text-on-surface">
                SELECT YOUR STATION
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-surface-container rounded-lg">
                <button
                  type="button"
                  onClick={() => setRole("WAITER")}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-all duration-200 ${
                    role === "WAITER"
                      ? "bg-surface-container-lowest shadow-sm border border-surface-variant/10 text-primary font-bold"
                      : "hover:bg-surface-container-high text-secondary"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">person</span>
                  <span className="font-label-bold text-[10px]">WAITER</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("KITCHEN")}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-all duration-200 ${
                    role === "KITCHEN"
                      ? "bg-surface-container-lowest shadow-sm border border-surface-variant/10 text-primary font-bold"
                      : "hover:bg-surface-container-high text-secondary"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">skillet</span>
                  <span className="font-label-bold text-[10px]">KITCHEN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("MANAGER")}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-all duration-200 ${
                    role === "MANAGER"
                      ? "bg-surface-container-lowest shadow-sm border border-surface-variant/10 text-primary font-bold"
                      : "hover:bg-surface-container-high text-secondary"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    admin_panel_settings
                  </span>
                  <span className="font-label-bold text-[10px]">ADMIN</span>
                </button>
              </div>
            </div>

            {/* Credentials */}
            <div className="flex flex-col gap-4">
              {/* Username Input */}
              <div className="flex flex-col gap-2">
                <label
                  className="font-label-bold text-label-bold text-on-surface"
                  htmlFor="identifier"
                >
                  USERNAME OR EMAIL
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
                    alternate_email
                  </span>
                  <input
                    type="text"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. chef.micheal"
                    className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-lg text-body-lg placeholder:text-outline/50"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label
                    className="font-label-bold text-label-bold text-on-surface"
                    htmlFor="password"
                  >
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password reset link sent (demo only).")}
                    className="font-label-bold text-[10px] text-primary hover:underline"
                  >
                    FORGOT?
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
                    lock
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-lg text-body-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Action */}
            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-4 rounded-lg font-title-md text-title-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Access Terminal
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Footer / Support */}
        <footer className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6 text-outline font-label-bold">
            <button
              onClick={() => alert("Privacy Policy")}
              className="hover:text-primary transition-colors text-xs"
            >
              Privacy Policy
            </button>
            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
            <button
              onClick={() => alert("Terms of Service")}
              className="hover:text-primary transition-colors text-xs"
            >
              Terms of Service
            </button>
            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
            <button
              onClick={() => alert("Help Desk")}
              className="hover:text-primary transition-colors text-xs"
            >
              Help Desk
            </button>
          </div>

          {/* Contextual Culinary Image */}
          <div className="w-full h-48 overflow-hidden rounded-xl border border-surface-variant/20 relative group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXgEmk5xNQAJWFeio206n-377tZcnxkH5QzTbEgU6FuQpZ9JipWegavWqusmkKjV6fQ6r58umhVpczQ9vuhYHG0PNtqzN5ywhC-tiwXkk8qTvhYyC1B3XRY88AUcjFsLdZjmAnWmz9NDPQRmh-GXERZ4zNYkssdiOeclUytyzC0_-X-p1h1dLUbFpK65CptQW_FfkIO5diCvyUDy9-s5_zNS1C4bCPh4WfA3tLjNmXSuVTzpMyti0Csod5_-Scv1anUC59l-UUJ5X5"
              alt="Chef hands"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent flex items-end p-4">
              <p className="font-label-bold text-on-surface-variant tracking-wider uppercase text-[10px]">
                Precision in every service.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
