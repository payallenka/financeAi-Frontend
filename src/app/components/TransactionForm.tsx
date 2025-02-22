"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { addTransaction } from "../services/api";

export default function TransactionForm({ onTransactionAdded }: { onTransactionAdded: () => void }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter(); 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    if (!description || !amount) {
      console.log("⚠️ Missing required fields!");
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔄 Sending transaction request...");

      const response = await addTransaction({ description, amount: parseFloat(amount) });

      setSuccess("Transaction added successfully!");
      setDescription("");
      setAmount("");
    } catch (err) {
      setError("Error adding transaction. Try again.");
    } finally {
      setLoading(false);
      console.log("🔽 Finished processing.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e); 
      }}
      className="p-4 border rounded-md shadow-lg bg-white"
    >
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
        className={`p-2 w-full rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Add Transaction"}
      </button>
    </form>
  );
}
