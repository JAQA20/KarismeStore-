import React from 'react';
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LoginPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="culinary-texture min-h-screen flex items-center justify-center p-8">
            <SignedIn>
                <Navigate to="/dashboard" replace />
            </SignedIn>
            <SignedOut>
                <main className="w-full max-w-[440px] flex flex-col gap-8 items-center">
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white text-4xl">restaurant_menu</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary tracking-tight">La Comanda</h1>
                        <p className="text-slate-500 font-medium">{t('login.subtitle')}</p>
                    </div>
                    
                    {/* Clerk SignIn Component */}
                    <SignIn 
                        fallbackRedirectUrl="/dashboard" 
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-xl border border-slate-200 rounded-2xl w-full",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                formButtonPrimary: "bg-primary hover:bg-primary/90 text-white font-bold py-3",
                            }
                        }}
                    />
                    
                    <footer className="flex flex-col items-center gap-6 mt-8 w-full">
                        <div className="w-full h-40 overflow-hidden rounded-2xl border border-slate-100 relative group grayscale hover:grayscale-0 transition-all duration-700">
                            <img alt="Kitchen" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXgEmk5xNQAJWFeio206n-377tZcnxkH5QzTbEgU6FuQpZ9JipWegavWqusmkKjV6fQ6r58umhVpczQ9vuhYHG0PNtqzN5ywhC-tiwXkk8qTvhYyC1B3XRY88AUcjFsLdZjmAnWmz9NDPQRmh-GXERZ4zNYkssdiOeclUytyzC0_-X-p1h1dLUbFpK65CptQW_FfkIO5diCvyUDy9-s5_zNS1C4bCPh4WfA3tLjNmXSuVTzpMyti0Csod5_-Scv1anUC59l-UUJ5X5" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-4">
                                <p className="text-white font-bold tracking-wider uppercase text-[10px]">{t('login.precision')}</p>
                            </div>
                        </div>
                    </footer>
                </main>
            </SignedOut>
        </div>
    );
};
