
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RoleBasedRoute } from "@/components/auth/RoleBasedRoute";
import Index from "./pages/Index";
import Policies from "./pages/Policies";
import Claims from "./pages/Claims";
import Compliance from "./pages/Compliance";
import Reconciliation from "./pages/Reconciliation";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Unauthorized from "./pages/Unauthorized";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes - accessible to all authenticated users */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Role-based routes */}
            <Route path="/policies" element={
              <RoleBasedRoute allowedRoles={["admin", "manager"]}>
                <Policies />
              </RoleBasedRoute>
            } />
            <Route path="/claims" element={
              <RoleBasedRoute allowedRoles={["admin", "manager", "accountant"]}>
                <Claims />
              </RoleBasedRoute>
            } />
            <Route path="/compliance" element={
              <RoleBasedRoute allowedRoles={["admin", "auditor"]}>
                <Compliance />
              </RoleBasedRoute>
            } />
            <Route path="/reconciliation" element={
              <RoleBasedRoute allowedRoles={["admin", "accountant", "analyst"]}>
                <Reconciliation />
              </RoleBasedRoute>
            } />
            <Route path="/invoices" element={
              <RoleBasedRoute allowedRoles={["admin", "accountant", "manager"]}>
                <Invoices />
              </RoleBasedRoute>
            } />
            <Route path="/customers" element={
              <RoleBasedRoute allowedRoles={["admin", "manager"]}>
                <Customers />
              </RoleBasedRoute>
            } />
            <Route path="/settings" element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <Settings />
              </RoleBasedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
