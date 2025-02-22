"use client";

import { useEffect, useState } from "react";
import { 
  getTransactions, 
  deleteTransaction, 
  updateTransaction, 
  getCategorySummary, 
  getMonthlySummary, 
  getYearlySummary 
} from "../services/api";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

type Summary = {
  labels: string[];
  values: number[];
  total_expense: number;
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});
  const [categorySummary, setCategorySummary] = useState<Summary | null>(null);
  const [monthlySummary, setMonthlySummary] = useState<Summary | null>(null);
  const [yearlySummary, setYearlySummary] = useState<Summary | null>(null);
  const [view, setView] = useState<'transactions' | 'category' | 'monthly' | 'yearly'>('transactions');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTransactions();
        if (!Array.isArray(data)) throw new Error("Invalid transactions data");
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Fetch summaries dynamically based on selected view
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        if (view === 'category') {
          setCategorySummary(await getCategorySummary());
        } else if (view === 'monthly') {
          setMonthlySummary(await getMonthlySummary());
        } else if (view === 'yearly') {
          setYearlySummary(await getYearlySummary());
        }
      } catch {
        setError(`Failed to load ${view} summary.`);
      }
    };

    if (view !== 'transactions') fetchSummary();
  }, [view]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((txn) => txn.id !== id));
    } catch {
      setError("Failed to delete transaction.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (txn: Transaction) => {
    setEditingId(txn.id);
    setEditData({ ...txn });
  };

  const handleSave = async () => {
    if (!editData.id || !editData.description || !editData.amount) return;

    try {
      await updateTransaction(editData as Transaction);
      setTransactions((prev) =>
        prev.map((txn) => (txn.id === editData.id ? (editData as Transaction) : txn))
      );
      setEditingId(null);
      setEditData({});
      alert("Transaction updated successfully!");
    } catch {
      setError("Failed to update transaction.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Transactions</h2>

      {loading && <p className="text-blue-500">Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* View toggles */}
      <div className="mb-4">
        <button onClick={() => setView('transactions')} className="bg-blue-500 text-white px-4 py-2 rounded">
          View Transactions
        </button>
        <button onClick={() => setView('category')} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Category Summary
        </button>
        <button onClick={() => setView('monthly')} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Monthly Summary
        </button>
        <button onClick={() => setView('yearly')} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Yearly Summary
        </button>
      </div>

      {/* Transaction List */}
      {view === 'transactions' && (
        <ul className="bg-white p-4 rounded shadow-md font-medium">
          {transactions.length === 0 && !loading && !error ? (
            <p className="text-gray-500">No transactions found.</p>
          ) : (
            transactions.map((txn) => (
              <li key={txn.id} className="flex justify-between items-center border p-3 mb-2 rounded-lg shadow-sm bg-gray-50">
                {editingId === txn.id ? (
                  <div className="flex-grow flex flex-col gap-2">
                    <input
                      type="text"
                      value={editData.description || ""}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="border p-2 rounded w-full"
                    />
                    <input
                      type="number"
                      value={editData.amount || ""}
                      onChange={(e) => setEditData({ ...editData, amount: parseFloat(e.target.value) })}
                      className="border p-2 rounded w-full"
                    />
                    <input
                      type="text"
                      value={editData.category || ""}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      className="border p-2 rounded w-full"
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow">
                    <p className="text-lg font-semibold text-gray-700">{txn.description}</p>
                    <p className="text-gray-500">Rs.{txn.amount}</p>
                    <p className="text-sm text-gray-600">Category: {txn.category}</p>
                    <p className="text-sm text-gray-500">Date: {new Date(txn.date).toLocaleDateString()}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(txn)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(txn.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    {deletingId === txn.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}

      {/* Summaries */}
      {view === 'category' && categorySummary && (
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Category Summary</h2>
        <p className="text-gray-600 font-medium">Total Expense: Rs.{categorySummary.total_expense}</p>
        <ul className="mt-2">
          {categorySummary.labels.map((label, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span className="text-gray-700">{label}</span>
              <span className="text-gray-900 font-semibold">Rs.{categorySummary.values[index]}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {view === 'monthly' && monthlySummary && (
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Monthly Summary</h2>
        <p className="text-gray-600 font-medium">Total Expense: Rs.{monthlySummary.total_expense}</p>
        <ul className="mt-2">
          {monthlySummary.labels.map((label, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span className="text-gray-700">{label}</span>
              <span className="text-gray-900 font-semibold">Rs.{monthlySummary.values[index]}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {view === 'yearly' && yearlySummary && (
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Yearly Summary</h2>
        <p className="text-gray-600 font-medium">Total Expense: Rs.{yearlySummary.total_expense}</p>
        <ul className="mt-2">
          {yearlySummary.labels.map((label, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span className="text-gray-700">{label}</span>
              <span className="text-gray-900 font-semibold">Rs.{yearlySummary.values[index]}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    </div>
  );
}
