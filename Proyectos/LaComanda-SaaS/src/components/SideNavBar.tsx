import React from "react";

interface SideNavBarProps {
  currentScreen: "login" | "tables" | "kitchen" | "dashboard";
  onNavigate: (screen: "tables" | "kitchen" | "dashboard") => void;
  onLogout: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  currentScreen,
  onNavigate,
  onLogout,
}) => {
  return (
    <aside className="h-screen w-72 fixed left-0 top-0 bg-surface-container dark:bg-surface-container-high border-r border-surface-variant/10 flex flex-col gap-2 py-8 z-50">
      {/* Brand Header */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">restaurant</span>
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed-dim leading-none tracking-tight">
              La Comanda
            </h1>
            <p className="text-on-surface-variant font-label-bold text-label-bold opacity-70 mt-1">
              Admin Terminal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow flex flex-col gap-1">
        {/* Dashboard Link */}
        <button
          onClick={() => onNavigate("dashboard")}
          className={`flex items-center gap-4 rounded-lg px-4 py-3 mx-2 transition-all duration-200 text-left ${
            currentScreen === "dashboard"
              ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/10"
              : "text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: currentScreen === "dashboard" ? '"FILL" 1' : '"FILL" 0' }}
          >
            dashboard
          </span>
          <span className="font-label-bold text-label-bold">Dashboard</span>
        </button>

        {/* Table View Link */}
        <button
          onClick={() => onNavigate("tables")}
          className={`flex items-center gap-4 rounded-lg px-4 py-3 mx-2 transition-all duration-200 text-left ${
            currentScreen === "tables"
              ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/10"
              : "text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: currentScreen === "tables" ? '"FILL" 1' : '"FILL" 0' }}
          >
            table_bar
          </span>
          <span className="font-label-bold text-label-bold">Table View</span>
        </button>

        {/* Kitchen Monitor Link */}
        <button
          onClick={() => onNavigate("kitchen")}
          className={`flex items-center gap-4 rounded-lg px-4 py-3 mx-2 transition-all duration-200 text-left ${
            currentScreen === "kitchen"
              ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/10"
              : "text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: currentScreen === "kitchen" ? '"FILL" 1' : '"FILL" 0' }}
          >
            restaurant
          </span>
          <span className="font-label-bold text-label-bold">Kitchen Monitor</span>
        </button>

        {/* Placeholder: Inventory */}
        <button
          onClick={() => alert("Inventory Module coming soon!")}
          className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-4 py-3 mx-2 transition-all duration-200 text-left"
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-bold text-label-bold">Inventory</span>
        </button>

        {/* Placeholder: Staff Control */}
        <button
          onClick={() => alert("Staff Control Module coming soon!")}
          className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-4 py-3 mx-2 transition-all duration-200 text-left"
        >
          <span className="material-symbols-outlined">groups</span>
          <span className="font-label-bold text-label-bold">Staff Control</span>
        </button>
      </nav>

      {/* Quick Action */}
      <div className="px-4 mb-4">
        <button
          onClick={() => alert("Quick Order initiated!")}
          className="w-full bg-primary-container text-on-primary-container font-label-bold text-label-bold py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
          Quick Order
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="mt-auto border-t border-surface-variant/20 pt-4 flex flex-col gap-1">
        <button
          onClick={() => alert("Help Center is currently offline. Contact system administrator.")}
          className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-4 py-3 mx-2 transition-all duration-200 text-left"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-bold text-label-bold">Help</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-4 text-error hover:bg-error/5 rounded-lg px-4 py-3 mx-2 transition-all duration-200 text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-bold text-label-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
};
