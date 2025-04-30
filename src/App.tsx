
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RoleBasedRoute } from "@/components/auth/RoleBasedRoute";
import { AuthProvider } from "@/components/auth/AuthContext";
import Index from "./pages/Index";
import Settlements from "./pages/Settlements";
import Payouts from "./pages/Payouts";
import Compliance from "./pages/Compliance";
import Reconciliation from "./pages/Reconciliation";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import KybVerification from "./pages/KybVerification";
import ServiceAgreement from "./pages/ServiceAgreement";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/kyb-verification" element={<KybVerification />} />
                <Route path="/service-agreement" element={<ServiceAgreement />} />
                
                {/* Protected routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/settlements" element={
                  <ProtectedRoute>
                    <Settlements />
                  </ProtectedRoute>
                } />
                <Route path="/payouts" element={
                  <ProtectedRoute>
                    <Payouts />
                  </ProtectedRoute>
                } />
                <Route path="/compliance" element={
                  <ProtectedRoute>
                    <Compliance />
                  </ProtectedRoute>
                } />
                <Route path="/reconciliation" element={
                  <ProtectedRoute>
                    <Reconciliation />
                  </ProtectedRoute>
                } />
                
                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
