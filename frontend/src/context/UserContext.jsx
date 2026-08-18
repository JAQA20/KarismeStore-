/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const initialProfile = {
  userInfo: {
    fullName: 'Sofia Loren Castellanos',
    email: 'sofia.loren@lifestyle.com',
    phone: '+506 8888 9999',
    password: '••••••••••••',
  },
  shippingAddress: {
    provincia: 'San José',
    canton: 'Escazú',
    distrito: 'Escazú Centro',
    direccionExacta: 'De la iglesia parroquial, 200m Norte y 50m Este, casa #45 color beige.',
    indicacionesAdicionales: 'Portón negro automático. Si no responden, llamar previamente al teléfono de contacto.',
  },
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiry: '08/28',
      holder: 'Sofia Loren Castellanos',
      isDefault: true,
    },
    {
      id: '2',
      type: 'sinpe',
      phone: '+506 8888-9999',
      holder: 'Sofia Loren Castellanos',
      isDefault: false,
    },
  ],
};

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('karisme_user_profile');
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karisme_user_profile', JSON.stringify(profile));
    } catch {
      // fallback
    }
  }, [profile]);

  const updateUserInfo = (newInfo) => {
    setProfile((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, ...newInfo },
    }));
  };

  const updateShippingAddress = (newAddress) => {
    setProfile((prev) => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, ...newAddress },
    }));
  };

  const setPaymentMethods = (newMethodsOrUpdater) => {
    setProfile((prev) => ({
      ...prev,
      paymentMethods:
        typeof newMethodsOrUpdater === 'function'
          ? newMethodsOrUpdater(prev.paymentMethods)
          : newMethodsOrUpdater,
    }));
  };

  // Helper string generator for checkout forms
  const getFormattedShippingAddress = () => {
    const { provincia, canton, distrito, direccionExacta, indicacionesAdicionales } = profile.shippingAddress;
    let addrStr = `${provincia}, ${canton}, ${distrito}. ${direccionExacta}`;
    if (indicacionesAdicionales?.trim()) {
      addrStr += ` (${indicacionesAdicionales.trim()})`;
    }
    return addrStr;
  };

  return (
    <UserContext.Provider
      value={{
        userInfo: profile.userInfo,
        shippingAddress: profile.shippingAddress,
        paymentMethods: profile.paymentMethods,
        updateUserInfo,
        updateShippingAddress,
        setPaymentMethods,
        getFormattedShippingAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
