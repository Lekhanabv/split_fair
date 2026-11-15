
import React from "react";
import { Wallet } from "lucide-react";

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen auth-bg flex items-center justify-center p-5">
      <div className="auth-card w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex justify-center items-center gap-3">
      <div className="logo-icon">
        <Wallet size={25} />
      </div>
      <span className="text-3xl font-bold brand">SplitFair</span>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
