"use client";

import { useState } from "react";
import { addTransaction } from "../services/api";

export default function TransactionForm({ onTransactionAdded }: { onTransactionAdded: () => void }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!description.trim() || !amount.trim()) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔄 Sending transaction request...");
      await addTransaction({ description, amount: parseFloat(amount) });

      setSuccess("✅ Transaction added successfully!");
      setDescription("");
      setAmount("");
      onTransactionAdded(); // Refresh transactions

      // Automatically clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("🚨 Error:", err);
      setError("Error adding transaction. Try again.");
    } finally {
      setLoading(false); // Ensure button resets
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-lg bg-white">
      <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
        disabled={loading}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
        disabled={loading}
      />

      <button
        type="submit"
        className={`p-2 w-full rounded transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Add Transaction"}
      </button>
    </form>
  );
}
