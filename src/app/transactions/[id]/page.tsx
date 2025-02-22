"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTransactionById } from "../../services/api";

type Transaction = {
  id: string; // ✅ Updated to string (UUID)
  description: string;
  amount: number;
  category: string;
  date: string;
};

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; // ✅ Ensure ID is treated as a string

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const data = await getTransactionById(id);
        setTransaction(data);
      } catch (err) {
        setError("Transaction not found.");
      }
    }

    fetchData();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!transaction) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold">{transaction.description}</h1>
      <p>Amount: ${transaction.amount}</p>
      <p>Category: {transaction.category}</p>
      <p>Date: {transaction.date}</p>

      <button
        onClick={() => router.push("/transactions")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Transactions
      </button>
    </div>
  );
}
