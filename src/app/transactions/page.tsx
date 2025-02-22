"use client";

import TransactionList from "../components/TransactionList";

export default function TransactionsPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <TransactionList />
    </div>
  );
}
