"use client";

import { useEffect, useState } from "react";
import { onAuthStateChange } from "./firebase";
import { User } from "firebase/auth";
import TransactionForm from "../app/components/TransactionForm";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to FinanceAI</h1>
        <p className="text-lg text-gray-700 mb-6">Your smart AI-powered finance tracker.</p>
        <p className="text-gray-600 max-w-lg text-center">
          FinanceAI helps you track your expenses and visualize your spending habits. 
          Sign in to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Finance Dashboard</h1>
        <TransactionForm onTransactionAdded={() => {}} />
      </div>
    </div>
  );
}
