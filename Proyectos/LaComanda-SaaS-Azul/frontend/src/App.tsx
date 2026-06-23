import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { TableView } from './pages/TableView';
import { KitchenMonitor } from './pages/KitchenMonitor';
import { Inventory } from './pages/Inventory';
import { StaffControl } from './pages/StaffControl';
import { AccessDenied } from './pages/AccessDenied';
import { Settings } from './pages/Settings';
import './index.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/tables" element={<ProtectedRoute><TableView /></ProtectedRoute>} />
                <Route path="/kitchen" element={<ProtectedRoute><KitchenMonitor /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
                <Route path="/staff" element={<ProtectedRoute><StaffControl /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/403" element={<ProtectedRoute><AccessDenied /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
