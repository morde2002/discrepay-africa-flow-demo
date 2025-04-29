
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <Shield className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600">
          You don't have permission to access this page. Please contact your administrator
          if you believe this is a mistake.
        </p>
        <div className="flex flex-col space-y-2">
          <Button 
            onClick={() => navigate("/")} 
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            Return to Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('userRole');
              navigate("/auth");
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
