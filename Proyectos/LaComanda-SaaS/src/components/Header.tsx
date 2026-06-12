import React from "react";

interface HeaderProps {
  title?: string;
  subtitle?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  middleContent?: React.ReactNode;
  userName?: string;
  userRole?: string;
  userImage?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  middleContent,
  userName = "Chef Marco",
  userRole = "Executive Chef",
  userImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDF5G192Xbar20BskAJ_WvxE3XJebjhN_pTdYnO9Z4Nk0_9MaGxAcQqEjrEwo4VAGRx15hmwKjsRSNobb3-YsDv5m-YcwlmgumndHApr9TW7Bzw35ZHZ7affB6nP0dGe6dUfTurtDOhnz6LV3JRxTzt6s_OFPrrvIXR4rproQqmCJKjvubwB8TwDV0l8lcmpdB2o5y1T7Hgd2ukIrvseqbjpm8f-xK8lNrjnoZi0jQEpqmSQEq80w2oFVV-uvXaltwYyg_JuKG7qfV9",
}) => {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-surface-variant/10">
      {/* Left Area: Title / Search */}
      <div className="flex items-center gap-4 flex-grow max-w-[40%]">
        {title ? (
          <div className="flex items-center gap-4">
            <span className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed-dim tracking-tight">
              {title}
            </span>
            {subtitle}
          </div>
        ) : onSearchChange !== undefined ? (
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary text-body-lg font-body-lg outline-none transition-all"
            />
          </div>
        ) : null}
      </div>

      {/* Middle Area: Stats / Custom content */}
      <div className="flex-grow flex justify-center">{middleContent}</div>

      {/* Right Area: Control Buttons & Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => alert("No new notifications")}
            className="text-secondary dark:text-secondary-fixed hover:bg-surface-container-low dark:hover:bg-surface-container-high p-2 rounded-full transition-colors duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            onClick={() => alert("Settings panel")}
            className="text-secondary dark:text-secondary-fixed hover:bg-surface-container-low dark:hover:bg-surface-container-high p-2 rounded-full transition-colors duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 pl-6 border-l border-surface-variant/20">
          <div className="text-right">
            <p className="font-label-bold text-label-bold text-on-surface leading-tight">
              {userName}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-primary font-bold">
              {userRole}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img
              src={userImage}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
