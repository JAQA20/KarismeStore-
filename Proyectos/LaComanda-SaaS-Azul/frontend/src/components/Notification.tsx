import React, { useState, useEffect } from 'react';

interface NotificationProps {
    title: string;
    time?: string;
    heading: string;
    description: string;
    type?: 'urgent' | 'success' | 'info';
    onClose?: () => void;
    autoCloseMs?: number;
}

export const Notification: React.FC<NotificationProps> = ({
    title,
    time = "JUST NOW",
    heading,
    description,
    type = 'urgent',
    onClose,
    autoCloseMs
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoCloseMs) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoCloseMs);
            return () => clearTimeout(timer);
        }
    }, [autoCloseMs]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    if (!isVisible) return null;

    // Define styles based on type
    let containerClass = "bg-error text-on-error";
    let icon = "priority_high";
    
    if (type === 'success') {
        containerClass = "bg-green-600 text-white";
        icon = "check_circle";
    } else if (type === 'info') {
        containerClass = "bg-primary text-white";
        icon = "info";
    }

    return (
        <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-8 duration-300">
            <div className={`${containerClass} p-4 rounded-xl shadow-xl border-2 border-white/20 flex items-center gap-4 min-w-[320px] ${type === 'urgent' ? 'animate-pulse' : ''}`}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <p className="font-label text-xs uppercase tracking-widest opacity-90 font-bold">{title}</p>
                        <span className="text-[10px] font-mono bg-black/20 px-2 py-0.5 rounded">{time}</span>
                    </div>
                    <p className="text-xl font-bold font-headline leading-tight mt-1">{heading}</p>
                    <p className="text-sm font-body opacity-90 mt-1">{description}</p>
                </div>
                <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-full transition-colors flex shrink-0 self-start">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>
    );
};
