import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    title?: string;
    searchPlaceholder?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
    searchPlaceholder
}) => {
    const { t } = useTranslation();
    const finalSearchPlaceholder = searchPlaceholder || t('header.search');

    return (
        <header className="flex justify-between items-center h-16 px-8 sticky top-0 z-40 glass-header">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
                    <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-body" placeholder={finalSearchPlaceholder} type="text" />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <button className="relative text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
                </button>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">history</span>
                </button>
                <div className="h-8 w-[1px] bg-outline-variant/30"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-xs font-bold font-label">Andrés G.</p>
                        <p className="text-[10px] text-on-surface-variant">{t('header.manager')}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high">
                        <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-xSOnmii4s3POtelZ2398y7bB4F168sKb4kR516PXLViUzUDeO41WoAl06f6oYJZ7uAT4sPenHD9-r66AgZrHMWu0C5Qxk8suQRipE4xzKCUffGFvWpHUcoMOVy8lXhlM_nzmcH9TcQamu3Zc5m8kycqVqIZZe2n68juLU9EfcOsG0kiLXemiE-VBkzKBMn9evNX2W_kC340_qgv6b0duWxX3lAU_2jJg3uOQNzCbmSbyWzOuI9OnBQ" />
                    </div>
                </div>
            </div>
        </header>
    );
};
